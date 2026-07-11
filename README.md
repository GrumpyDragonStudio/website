# website

Wow Games official website — https://www.wowgames.us

Vue 3 single-page site. Static assets that must keep their URLs (`app-ads.txt`, `privacy/*.html`) live in `public/`.

## Development

Requires Node.js (yarn is used via corepack).

```
corepack yarn install --ignore-engines
corepack yarn serve        # dev server at http://localhost:8080
corepack yarn build        # production build into dist/
```

`--ignore-engines` is needed because an old transitive dependency declares outdated Node engine ranges.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages (custom domain: www.wowgames.us, DNS managed at Squarespace).

The previous Alpaca Games deployment (nginx on AWS/Azure, alpacagames.us) is retired; see git history of this README if those notes are ever needed.
