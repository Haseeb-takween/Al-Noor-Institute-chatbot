# Al-Noor Institute — Website & Chatbot

Next.js App Router project: marketing site, streaming AI chat widget, enrolment form, and admin dashboard. All APIs live in `app/api/` — no separate Express backend.

## Tech stack

- **Framework:** Next.js (App Router)
- **UI:** React + Tailwind CSS
- **AI:** Vercel AI SDK + Google Gemini
- **DB:** MongoDB (mongoose) — optional

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/)

## Local setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy the example env file:

```bash
cp .env.example .env.local
```

3. Fill in `.env.local` (see below), then start:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | For chat | Gemini API key (`GEMINI_API_KEY` also accepted) |
| `MONGODB_URI` | Optional | Chat transcripts + enrolments persistence |
| `ADMIN_EMAIL` | For `/admin` | Admin login email |
| `ADMIN_PASSWORD` | For `/admin` | Admin login password |
| `ADMIN_SESSION_SECRET` | For `/admin` | JWT signing secret |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Create production build |
| `pnpm start` | Run production build locally |
| `pnpm lint` | Run ESLint |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Marketing site + chat widget |
| `/enrol` | Enrolment form |
| `/admin/login` | Admin login |
| `/admin` | Dashboard (stats, conversations) |
| `/admin/conversations/[id]` | Conversation detail |
| `/admin/enrolments` | Enrolment requests |

## Deploy on Vercel

1. Create a Vercel project linked to this repo.
2. Root Directory can stay empty (repo root is the Next.js app).
3. Add the env vars from the table above.
4. Deploy.

Framework preset (Next.js) is auto-detected. No second backend project needed.
