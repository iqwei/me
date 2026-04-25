# ninetynine.dev

Personal website for me (Oleksandr Halashevskyi), built with Next.js App Router, React, Tailwind CSS, Motion and PostHog.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev    # start local development
npm run build  # create a production build
npm run start  # serve the production build
npm run lint   # run ESLint
```

## Project Structure

```text
src/app/                  App Router entrypoints and global CSS
src/components/sections/  Website sections and badge-specific styles
src/components/ui/        Reusable interactive UI primitives
src/data/                 Site content, links, projects, and config
src/lib/                  Shared utilities
```

## Analytics

PostHog is initialized from `src/instrumentation-client.ts`.

Create `.env.local` when analytics should run locally:

```bash
cp .env.example .env.local
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Without `NEXT_PUBLIC_POSTHOG_KEY`, analytics no-op safely. PostHog traffic is proxied through `/ingest/*` via `next.config.ts`.
