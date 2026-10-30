# My Eleventy site

## Develop locally

Requires Node.js 22 or newer.

```sh
npm ci
npm start
```

Open the local URL printed by Eleventy. Edit `src/index.md` for homepage content,
`src/_includes/layout.njk` for the shared HTML layout, and
`src/assets/style.css` for styles.

## Build

```sh
npm run build
```

The generated static site is written to `_site/` (not committed).

## Deploy to GitHub Pages

1. In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.
2. Commit and push these files to `main`.
3. Follow the deployment in the **Actions** tab.

The workflow installs dependencies, builds Eleventy, and deploys `_site/`.
The public URL is https://bhardwajbhat.github.io/checking/.

The build uses `/checking/` as its path prefix on GitHub Actions and `/` locally.
If the repository name or hosting path changes, update `eleventy.config.js`.
Use Eleventy's `url` filter for internal links and asset URLs in templates so
that this prefix is included.
