// Sums lifetime install counts across all Wow Games titles from the private
// Google Play "bulk stats" bucket, and writes the total to public/downloads.json.
//
// Requires two env vars, set as GitHub Actions secrets:
//   GPLAY_SERVICE_ACCOUNT_KEY - full JSON key of a service account that has been
//     granted the "View app information and download bulk reports" permission
//     for the Play Console developer account, in Play Console > Users and permissions.
//   GPLAY_STATS_BUCKET - the Cloud Storage URI shown on
//     Play Console > Download reports (the "Copy Cloud Storage URI" button),
//     e.g. gs://pubsite_prod_0123456789012345678/stats/installs/
//
// See README section "Download counter" for full setup steps.

const fs = require('fs');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const { parse } = require('csv-parse/sync');

const PACKAGE_IDS = [
  'com.wowgames.dotsort.colorpuzzle',
  'com.wowgames.numberblast',
  'com.wowgames.wherearethecats',
  'com.wowgames.brickz',
  'com.grumpydragonstudio.numbermix',
  'us.alpacagames.dotpuzzle',
  'us.wowgames.flowermatch',
];

const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'downloads.json');
const SCAN_START_YEAR = parseInt(process.env.GPLAY_STATS_START_YEAR || '2022', 10);

function pickInstallsColumn(header) {
  const normalized = header.map((h) => h.trim().toLowerCase());
  const idx = normalized.findIndex(
    (h) => h.includes('daily') && h.includes('install') && !h.includes('uninstall') && !h.includes('upgrade')
  );
  if (idx === -1) {
    throw new Error(`Could not find a "Daily ... Installs" column in header: ${header.join(', ')}`);
  }
  return idx;
}

function sumInstallsCsv(buffer) {
  // Play's bulk stats CSVs are UTF-16LE with a BOM.
  const text = buffer.toString('utf16le').replace(/^﻿/, '');
  const rows = parse(text, { skip_empty_lines: true });
  if (rows.length < 2) return 0;

  const idx = pickInstallsColumn(rows[0]);
  let total = 0;
  for (const row of rows.slice(1)) {
    const value = parseInt(row[idx], 10);
    if (!Number.isNaN(value)) total += value;
  }
  return total;
}

function parseStatsUri(value) {
  const clean = value.trim().replace(/^gs:\/\//, '').replace(/\/+$/, '');
  const [bucketName, ...prefixParts] = clean.split('/');
  const objectPrefix = prefixParts.length > 0 ? prefixParts.join('/') : 'stats/installs';
  if (!bucketName) throw new Error('GPLAY_STATS_BUCKET must include a Cloud Storage bucket name');
  return { bucketName, objectPrefix };
}

async function sumPackageInstalls(bucket, objectPrefix, packageId) {
  let total = 0;
  let reportCount = 0;
  const misses = {
    forbidden: 0,
    notFound: 0,
    firstForbiddenObject: null,
    firstNotFoundObject: null,
  };
  const now = new Date();
  const currentYear = now.getUTCFullYear();
  const currentMonth = now.getUTCMonth() + 1;

  for (let year = SCAN_START_YEAR; year <= currentYear; year += 1) {
    const lastMonth = year === currentYear ? currentMonth : 12;
    for (let month = 1; month <= lastMonth; month += 1) {
      const yyyymm = `${year}${String(month).padStart(2, '0')}`;
      const objectName = `${objectPrefix}/installs_${packageId}_${yyyymm}_overview.csv`;

      try {
        const [buffer] = await bucket.file(objectName).download();
        reportCount += 1;
        total += sumInstallsCsv(buffer);
      } catch (err) {
        if (err.code === 403) {
          misses.forbidden += 1;
          if (!misses.firstForbiddenObject) misses.firstForbiddenObject = objectName;
          continue;
        }
        if (err.code === 404) {
          misses.notFound += 1;
          if (!misses.firstNotFoundObject) misses.firstNotFoundObject = objectName;
          continue;
        }
        throw err;
      }
    }
  }
  if (reportCount === 0) {
    console.warn(
      `${packageId}: no overview install reports found since ${SCAN_START_YEAR} ` +
        `(403: ${misses.forbidden}, 404: ${misses.notFound})`
    );
    if (misses.firstForbiddenObject) console.warn(`${packageId}: first 403 object: ${misses.firstForbiddenObject}`);
    if (misses.firstNotFoundObject) console.warn(`${packageId}: first 404 object: ${misses.firstNotFoundObject}`);
  }
  return { installs: total, reportCount, misses };
}

async function main() {
  const keyJson = process.env.GPLAY_SERVICE_ACCOUNT_KEY;
  const statsUri = process.env.GPLAY_STATS_BUCKET;
  if (!keyJson || !statsUri) {
    throw new Error('GPLAY_SERVICE_ACCOUNT_KEY and GPLAY_STATS_BUCKET must both be set');
  }

  const { bucketName, objectPrefix } = parseStatsUri(statsUri);

  const storage = new Storage({ credentials: JSON.parse(keyJson) });
  const bucket = storage.bucket(bucketName);

  let totalDownloads = 0;
  let totalReportCount = 0;
  const totalMisses = { forbidden: 0, notFound: 0 };
  const perGame = {};
  for (const packageId of PACKAGE_IDS) {
    const { installs, reportCount, misses } = await sumPackageInstalls(bucket, objectPrefix, packageId);
    perGame[packageId] = installs;
    totalDownloads += installs;
    totalReportCount += reportCount;
    totalMisses.forbidden += misses.forbidden;
    totalMisses.notFound += misses.notFound;
    console.log(`${packageId}: ${installs.toLocaleString()}`);
  }
  if (totalReportCount === 0) {
    throw new Error(
      `No install overview reports were found in gs://${bucketName}/${objectPrefix}. ` +
        `Checked monthly overview objects since ${SCAN_START_YEAR}; got ${totalMisses.forbidden} forbidden and ${totalMisses.notFound} not found responses. ` +
        'Verify GPLAY_STATS_BUCKET and the Play Console bulk reports permissions.'
    );
  }

  const payload = {
    totalDownloads,
    perGame,
    updatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2) + '\n');
  console.log(`\nTotal: ${totalDownloads.toLocaleString()} -> ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
