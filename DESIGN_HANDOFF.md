# Al-Noor Institute — Website & Chatbot · Design Handoff

A premium marketing site for Al-Noor Institute with an integrated, streaming AI
assistant. Built in **Next.js only** (App Router) — navy + gold on white.

---

## 1. Architecture decision — Next.js only (recommended)

**Recommendation: fold the Express backend into Next.js and use the Vercel AI SDK.**

| | Express + Next.js (before) | Next.js only (now) |
|---|---|---|
| Codebases | 2 (separate deploys) | 1 |
| Chat API | Express controller → Gemini SDK | `app/api/chat/route.ts` → Vercel AI SDK |
| Streaming | Non-streaming JSON reply | Token-by-token streaming |
| CORS | Required between apps | None (same origin) |
| Hosting | 2 Vercel projects | 1 Vercel project |

**Why:** Next.js Route Handlers do everything the Express server did for chat —
provider abstraction, streaming, edge/Node runtime — with one deploy, no CORS, and
native streaming into the UI. Express only earns its keep when you need long-running
processes or a non-Vercel host; neither applies here.

**Fully migrated — the whole Express backend now lives inside the Next.js app**
(repo root). The separate Express `backend/` and nested `frontend/` folders
have been removed — this repo is a single Next.js project.

Server code lives in `lib/server/`:
`db.ts` (mongoose, cached connection), `models.ts` (Conversation + Enrolment),
`auth.ts` (JWT admin auth — same Bearer-token scheme as before), `prompt.ts`
(the **exact original** system prompt + knowledge base, verbatim), `http.ts` (helpers).
The same prompt `.md` files are kept in `prompts/` for reference.

API route handlers (`app/api/`):

| Method & path | Purpose | Auth |
|---|---|---|
| `POST /api/chat` | Streaming Gemini reply (Vercel AI SDK) + saves transcript, returns `X-Conversation-Id` | public |
| `GET/POST /api/conversations` | List / create conversations | public |
| `GET/DELETE /api/conversations/:id` | Read / delete a conversation | public |
| `POST /api/admin/login` | Returns a JWT for the admin panel | public |
| `GET /api/admin/stats` | Totals (conversations, messages, enrolments) | admin |
| `GET /api/admin/conversations(/:id)` | Paginated list / detail | admin |
| `GET /api/admin/enrolments` | Enrolment requests | admin |
| `POST /api/enrol` | Save an enrolment request | public |
| `GET /api/health` | DB + AI configuration status | public |

**Chat persistence:** if `MONGODB_URI` is set, every conversation is stored and
appears in the admin panel; the widget threads follow-ups via `X-Conversation-Id`.
Without a DB, chat still works statelessly.

**Provider:** kept **Gemini** — swapping providers later is a one-line change
(replace `@ai-sdk/google` with e.g. `@ai-sdk/openai` / `@ai-sdk/anthropic`).

**Legacy files (safe to delete):** unused old UI `components/ChatWindow.tsx`,
`ConversationSidebar.tsx`, `MessageBubble.tsx`, `MessageInput.tsx`,
`TypingIndicator.tsx`. `lib/chat.ts` is kept (shared type + public conversation helpers).

---

## 2. Design system

**Direction:** navy + gold on white — formal, prestigious, academic, with generous
white space and an Islamic-geometric decorative motif. Display serif for headings,
clean sans for body.

### Colour tokens (`app/globals.css`)

| Token | Value | Use |
|---|---|---|
| `--white` | `#ffffff` | Base background |
| `--paper` | `#f5f8fd` | Alternating section background |
| `--navy` | `#0a1f44` | Primary brand / dark sections |
| `--navy-deep` | `#06152e` | Deepest navy (footer, gradients) |
| `--navy-soft` | `#143a76` | Hover / lighter navy |
| `--gold` | `#c9a24a` | Accent |
| `--gold-bright` | `#e6c877` | Highlights, on-navy accents |
| `--gold-deep` | `#a9832f` | Gold text on light (AA contrast) |
| `--ink` | `#0c1a33` | Headings |
| `--body` | `#43506a` | Paragraph text |
| `--muted` | `#7a879e` | Captions / meta |
| `--line` / `--line-strong` | `#e4e9f3` / `#d3dbeb` | Borders |

Gold is used for accents and large/decorative type only — never small body text on
white (contrast). `--gold-deep` is the accessible gold for text on light surfaces.

### Type
- **Display / headings:** Fraunces (serif, optical), weights 400–600, with italic
  used for emphasis lines.
- **Body / UI:** Inter, 400–700.
- Both wired via `next/font` in `app/layout.tsx` → CSS vars `--font-display`,
  `--font-sans` → Tailwind `font-display`, `font-sans`.

### Reusable primitives (in `globals.css`)
`.btn` + `.btn-gold` (sheen on hover) / `.btn-navy` / `.btn-ghost` /
`.btn-outline-light` · `.card` + `.card-hover` (lift) · `.eyebrow` · `.gold-rule` ·
`.text-gold-grad` · `.pattern-geo` (geometric) · `.pattern-dots-navy`.

### Motion
`.reveal` (scroll-in, via `Reveal.tsx` + IntersectionObserver, respects
`prefers-reduced-motion`) · count-up stats · `floaty` / `spin-slow` hero ornament ·
`pulse-ring` chat launcher · accordion grid-rows transition · `widget-in` / `msg-in`
chat animations · button sheen · nav underline & mega-menu.

---

## 3. Page structure & components

All section components live in `components/site/`; content is centralised in
`lib/site-data.ts` (edit facts there).

| Order | Section | File | Notes / micro-interactions |
|---|---|---|---|
| — | Navbar | `Navbar.tsx` | 5 links (About, Courses, Fees, Teachers, Contact), scroll-blur, **Courses mega-menu mockup**, mobile drawer, Enrol CTA |
| 1 | Hero | `Hero.tsx` | Headline, CTAs, trust ticks, rotating star medallion + floating course chips |
| 2 | Stats | `Stats.tsx` | Navy band, **count-up on scroll** |
| 3 | About | `About.tsx` | Institute detail, fact grid, 3 pillars |
| 4 | Courses | `Courses.tsx` | 5 course cards + free-trial tile, hover lift + icon fill |
| 5 | Features | `Features.tsx` | 6 "Why Al-Noor" cards |
| 6 | How it works | `HowItWorks.tsx` | 4-step timeline |
| 7 | Teachers | `Teachers.tsx` | Navy section: quality + schedule/delivery card |
| 8 | Fees | `Pricing.tsx` | Price list, discounts, refund policy |
| 9 | FAQ | `Faq.tsx` | Accordion (8 Q&As) |
| 10 | Footer / Contact | `Footer.tsx` | Gold CTA band, contact, links |
| — | Chat widget | `chat/ChatWidget.tsx` | Floating bottom-right launcher + streaming panel |

Other pages: **`/enrol`** (`app/enrol/page.tsx`) — a premium 3-step enrolment form
(programme → your details → preferences) posting to `/api/enrol`, with a success
screen. Admin panel (navy/gold, shared `components/admin/AdminHeader.tsx` with
Conversations | Enrolments tabs): **`/admin`** (dashboard: 3 stat cards + recent chats),
**`/admin/enrolments`** (all enrolment requests), **`/admin/login`**,
**`/admin/conversations/[id]`** (full transcript). A discreet **"Staff sign in"** link
sits in the site footer → `/admin/login`. Login is rate-limited (5 attempts / 15 min
per IP). All "Enrol"/"Book a free trial" CTAs across the site point to `/enrol`.

Shared: `Reveal.tsx`, `SectionHeading.tsx`, `Icons.tsx` (custom SVG set + brand
`Logo`).

---

## 4. The chatbot

- **Launcher:** fixed bottom-right, navy circle + gold chat icon, attention pulse.
- **Panel:** navy header, suggested questions on empty state, streaming replies with
  markdown, typing indicator, "can't book here" footer note.
- **Data flow:** widget POSTs `{ conversationId, messages }` to `/api/chat` →
  `streamText` streams Gemini tokens back → widget appends them live and stores the
  returned `X-Conversation-Id` so follow-ups thread into one saved transcript.
- **System prompt:** `lib/server/prompt.ts` — the **exact original** system prompt +
  knowledge base, verbatim (same content as `prompts/*.md`). All safety rules
  preserved: KB-only answers, no inference, fallback message, greeting mirroring,
  rumour handling, no fatwas, prompt-injection resistance.

---

## 5. Setup & run

```bash
pnpm install                     # deps: ai, @ai-sdk/google, mongoose, jsonwebtoken
cp .env.example .env.local       # then fill in:
#   GOOGLE_GENERATIVE_AI_API_KEY=...   (required for chat; GEMINI_API_KEY also accepted)
#   MONGODB_URI=...                    (optional — enables saved transcripts & enrolments)
#   ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_SESSION_SECRET   (required for /admin login)
pnpm dev                         # http://localhost:3000
```

Build / deploy: `pnpm build` then deploy the repo root as a single Vercel
project. Set `GOOGLE_GENERATIVE_AI_API_KEY` in the Vercel env. The old `backend`
project is no longer needed for the public site.

Dependencies in `package.json`: `ai` (Vercel AI SDK core),
`@ai-sdk/google` (Gemini provider).

---

## 6. Suggested next steps
1. Remove or migrate the legacy Express-dependent files (§1) once admin is ported.
2. Add real Open Graph / social images and a favicon set.
3. Optional: persist conversations via a Route Handler + your DB if you want the
   admin transcript view back.
4. Run an accessibility pass (contrast is designed to AA; verify keyboard focus
   rings and the chat panel's focus trap on mobile).
