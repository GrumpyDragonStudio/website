// Sums lifetime install counts across all Wow Games titles from the private
// Google Play "bulk stats" bucket, and writes the total to public/downloads.json.
//
// Requires two env vars, set as GitHub Actions secrets:
//   GPLAY_SERVICE_ACCOUNT_KEY - full JSON key of a service account that has been
//     granted the "View app information and download bulk reports" permission
//     for the Play Console developer account, in Play Console > Users and permissions.
//   GPLAY_STATS_BUCKET - the Cloud Storage bucket name shown on
//     Play Console > Download reports (the "Copy Cloud Storage URI" button),
//     e.g. pubsite_prod_rev_0123456789012345678
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
const START_YEAR = parseInt(process.env.GPLAY_STATS_START_YEAR || '2022', 10);

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

async function sumPackageInstalls(bucket, packageId) {
  let total = 0;
  let foundAnyReport = false;
  const now = new Date();
  const currentYear = now.getUTCFullYear();
  const currentMonth = now.getUTCMonth() + 1;

  for (let year = START_YEAR; year <= currentYear; year += 1) {
    const lastMonth = year === currentYear ? currentMonth : 12;
    for (let month = 1; month <= lastMonth; month += 1) {
      const yyyymm = `${year}${String(month).padStart(2, '0')}`;
      const objectName = `stats/installs/installs_${packageId}_${yyyymm}_overview.csv`;

      try {
        const [buffer] = await bucket.file(objectName).download();
        foundAnyReport = true;
        total += sumInstallsCsv(buffer);
      } catch (err) {
        if (err.code === 404) continue;
        if (err.code === 403) {
          throw new Error(
            `No permission to download ${objectName}. Confirm the service account has global Play Console access to download bulk reports.`
          );
        }
        throw err;
      }
    }
  }
  if (!foundAnyReport) console.warn(`${packageId}: no overview install reports found since ${START_YEAR}`);
  return total;
}

async function main() {
  const keyJson = process.env.GPLAY_SERVICE_ACCOUNT_KEY;
  const bucketName = process.env.GPLAY_STATS_BUCKET;
  if (!keyJson || !bucketName) {
    throw new Error('GPLAY_SERVICE_ACCOUNT_KEY and GPLAY_STATS_BUCKET must both be set');
  }

  // Tolerate pasting the full "gs://bucket/" URI (e.g. from Play Console's
  // "Copy Cloud Storage URI" button) instead of a bare bucket name.
  const cleanBucketName = bucketName.trim().replace(/^gs:\/\//, '').replace(/\/+$/, '');

  const storage = new Storage({ credentials: JSON.parse(keyJson) });
  const bucket = storage.bucket(cleanBucketName);

  let totalDownloads = 0;
  const perGame = {};
  for (const packageId of PACKAGE_IDS) {
    const installs = await sumPackageInstalls(bucket, packageId);
    perGame[packageId] = installs;
    totalDownloads += installs;
    console.log(`${packageId}: ${installs.toLocaleString()}`);
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
