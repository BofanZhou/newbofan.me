# bofan

Personal website first version for bofan. Built with Vue 3, Vite, TypeScript, Pinia, Vue Router, vue-i18n, Tailwind CSS and lucide-vue-next.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Vercel

Recommended Vercel project settings:

- Framework Preset: `Vite`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: project root

Optional environment variable:

```bash
VITE_GITHUB_USERNAME=BofanZhou
```

`vercel.json` includes a rewrite to `index.html` so Vue Router routes such as `/zh/blog` and `/en/projects/:id` work after refresh.

## Notes

- Static content lives in `src/data`.
- Chinese and English routes are available at `/zh` and `/en`.
- Blog list/detail routes are available at `/zh/blog`, `/en/blog`, `/zh/blog/:slug`, and `/en/blog/:slug`.
- GitHub API integration is prepared through `.env.example`; no token is stored in frontend code.
