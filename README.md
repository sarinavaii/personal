# Salar Sari Navaii — Personal Website

Portfolio and writing site for Salar Sari Navaii, a senior front-end developer.
The interface follows a Vercel/Next.js-inspired design language: Geist type,
true-black and white surfaces, hairline borders, and a restrained blue accent.

## Stack

- **Next.js 16** (App Router, Turbopack) and **React 19**
- **Tailwind CSS 4** with CSS-variable design tokens
- **Geist Sans** and **Geist Mono**, self-hosted through `next/font/local`
- **Velite** for MDX articles and syntax highlighting
- **yet-another-react-lightbox** for project galleries

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Description                              |
| ------------- | ---------------------------------------- |
| `pnpm dev`    | Start the development server             |
| `pnpm build`  | Build Velite content and the Next.js app |
| `pnpm start`  | Serve the production build               |
| `pnpm lint`   | Run ESLint                               |
| `pnpm format` | Format the repository with Prettier      |

## Structure

```text
content/blog/            MDX articles (validated by velite.config.ts)
messages/en.json         Site copy, contact details, and skill categories
src/app/                 Routes, metadata, sitemap, robots, OG images
src/components/layout/   Header, footer, theme script and toggle
src/components/sections/ Home, project, blog, and contact sections
src/components/ui/       Shared primitives (buttons, badges, prose, lightbox)
src/core/data/PROJECTS.ts Featured project data
src/styles/              Design tokens and global/prose styles
src/templates/           Page composition layer
```

## Content

Add an article as `content/blog/<slug>.mdx` with `title`, `description`,
`date`, and optional `tags`. Velite regenerates the typed `posts` collection on
`pnpm dev` and `pnpm build`.

Project cards read from `src/core/data/PROJECTS.ts`. Add a `cover` path (or rely
on the first gallery image) to control the card thumbnail.

## Theme

The site ships dark by default with a light mode toggle. The theme is applied
before first paint by an inline script and stored in `localStorage`; colors live
in `src/styles/variables.css`. Code blocks in articles intentionally keep their
dark Shiki theme in both modes.

## Deployment

Any standard Next.js host works. The blog, project pages, sitemap, and Open Graph
images are pre-rendered at build time.
