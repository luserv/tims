# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TIMS is a university department website for ESPOCH's Information Technology Engineering program (Ingeniería en Tecnologías de la Información). It's a Next.js 15 App Router application with a public-facing site and an admin CMS for managing news and events. All UI is in Spanish.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint

# Database
npx prisma generate     # Regenerate Prisma client after schema changes
npx prisma migrate dev  # Apply schema migrations
npx prisma db seed      # Seed default admin user (admin@tims.com / admin123)
npx prisma studio       # Open Prisma Studio GUI
```

No test suite exists in this project.

## Environment Variables

Required in `.env`:
- `DATABASE_URL` — PostgreSQL connection string
- `AUTH_SECRET` — NextAuth secret (any random string)

## Architecture

**Stack:** Next.js 15 (App Router) · TypeScript · PostgreSQL · Prisma ORM · NextAuth v5 · Tailwind CSS 4 · shadcn/ui

### Key Conventions

- `@/*` path alias maps to `./src/*`
- Prettier: 120-char line width, single quotes, trailing commas
- SVGs imported via `@svgr/webpack` as React components (`next.config.ts`)
- ESLint errors are ignored during builds (`next.config.ts`)
- Global styles in `src/styles/globals.css` and `src/styles/brand.css`

### Route Structure

| Path | Description |
|---|---|
| `/` | Landing page (public) |
| `/timeline` | News + Events combined view (public, client component, fetches from API) |
| `/club` | Club info (public) |
| `/consejo-estudiantil` | Student council page (public) |
| `/login` | Credentials login |
| `/admin` | Admin dashboard (ADMIN role only) |
| `/admin/news` | News CRUD |
| `/admin/events` | Events CRUD |

### Authentication & Authorization

NextAuth v5 with JWT + Credentials provider. Three roles in the schema: `USER`, `EDITOR`, `ADMIN` — only `ADMIN` has privileged access in the current implementation; `EDITOR` is defined but unused.

- Auth config in `src/auth.ts`; JWT callback injects `role`, session callback exposes it
- Admin layout (`src/app/admin/layout.tsx`) server-side redirects if `role !== 'ADMIN'`
- All API mutation routes check `session.user.role === 'ADMIN'`
- `src/components/providers.tsx` wraps the app with both `ThemeProvider` (next-themes, system default) and `SessionProvider`

### API Routes

RESTful JSON APIs under `src/app/api/`. Pattern: `/api/news/route.ts` (collection) + `/api/news/[id]/route.ts` (single resource). Same pattern for events.

### Database

Prisma schema at `prisma/schema.prisma`. Key content models: `News` and `Event`. `User` has a `role` enum. `Account`, `Session`, and `VerificationToken` models exist for NextAuth adapter compatibility but are unused since the session strategy is JWT.

News has an optional `publishedAt` field — the schema supports drafts, but the admin UI always sets `publishedAt: new Date()` on create, so draft functionality is not currently exposed. The public GET `/api/news` only returns records where `publishedAt IS NOT NULL`.

The Prisma client is a dev-cached singleton in `src/lib/prisma.ts` to avoid connection pool exhaustion during hot reloads.
