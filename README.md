# newbofan.me

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

Personal website of **Bofan Zhou** — a portfolio, blog, and digital garden built with Vue 3.

- **Live Site:** [https://bofan.vercel.app](https://bofan.vercel.app) *(update after deployment)*
- **Tech Stack:** Vue 3 · Vite · TypeScript · Tailwind CSS · Pinia · Vue Router · vue-i18n

## Features

- **Bilingual:** Chinese (`/zh`) and English (`/en`) routes with full i18n support
- **Responsive Design:** Mobile-first layout powered by Tailwind CSS
- **Scroll Animations:** GSAP + Lenis smooth scrolling
- **GitHub Integration:** Live code footprint section using GitHub public API
- **Blog:** Markdown-ready blog list and detail pages
- **Photography Gallery:** Link to external photography portfolio

## Tech Stack

| Category | Libraries |
|----------|-----------|
| Framework | [Vue 3](https://vuejs.org/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| State | [Pinia](https://pinia.vuejs.org/) |
| Router | [Vue Router](https://router.vuejs.org/) |
| i18n | [vue-i18n](https://vue-i18n.intlify.dev/) |
| Animation | [GSAP](https://greensock.com/gsap/) · [Lenis](https://lenis.darkroom.engineering/) |
| Icons | [Lucide Vue](https://lucide.dev/guide/packages/lucide-vue-next) |

## Project Structure

```
.
├── public/              # Static assets
├── src/
│   ├── components/      # Vue components
│   │   ├── common/      # Shared UI components
│   │   ├── home/        # Homepage sections
│   │   └── layout/      # Header, Footer, etc.
│   ├── data/            # Content data (projects, blog, experience, etc.)
│   ├── i18n/            # Translation files (zh, en)
│   ├── pages/           # Route-level pages
│   ├── router/          # Vue Router config
│   ├── stores/          # Pinia stores
│   └── styles/          # Global CSS
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm or equivalent package manager

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

The dev server will start at `http://localhost:5173`.

### Build

```bash
npm run build
```

Output is generated in the `dist/` directory.

## Deployment

### Vercel (Recommended)

| Setting | Value |
|---------|-------|
| Framework Preset | `Vite` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

`vercel.json` includes a rewrite rule to `index.html` so Vue Router handles client-side navigation on refresh.

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
VITE_GITHUB_USERNAME=BofanZhou
```

No GitHub token is stored in frontend code — only public API data is used.

## Customization

Homepage copy lives in `src/data/homeCopy.ts` (both Chinese and English).  
Section titles and navigation labels are in `src/i18n/zh.ts` and `src/i18n/en.ts`.

## License

[MIT](./LICENSE) © 2026 Bofan Zhou
