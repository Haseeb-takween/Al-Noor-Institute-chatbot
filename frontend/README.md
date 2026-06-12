# AI Chatbot Frontend

Next.js chat interface for the Al-Noor Institute chatbot, with an admin dashboard for viewing conversations.

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS 4
- **Fonts:** IBM Plex Sans, JetBrains Mono

## Project structure

```
frontend/
├── app/
│   ├── page.tsx                        # Public chat page
│   └── admin/
│       ├── login/page.tsx              # Admin login
│       ├── page.tsx                    # Admin dashboard
│       └── conversations/[id]/page.tsx # Conversation detail
├── components/
│   ├── ChatWindow.tsx                  # Main chat UI
│   ├── ConversationSidebar.tsx         # Conversation list
│   ├── MessageBubble.tsx               # Single message
│   ├── MessageInput.tsx                # Message input field
│   └── TypingIndicator.tsx             # Loading indicator
└── lib/
    ├── chat.ts                         # Public chat API client
    └── admin.ts                        # Admin API client
```

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/)
- Backend API running (see `../backend/README.md`)

## Local setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy the example env file:

```bash
cp .env.local.example .env.local
```

3. Make sure `.env.local` points to your local backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. Start the dev server:

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) (Next.js defaults to port 3000; if the backend uses 3000, Next.js will use 3001).

Make sure the backend `CORS_ORIGIN` includes your frontend port (e.g. `http://localhost:3001`).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API base URL including `/api` |

**Local:**

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Production (set in Vercel):**

```env
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api
```

> `NEXT_PUBLIC_*` variables are embedded at build time. Redeploy after changing them.

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
| `/` | Public chat interface |
| `/admin/login` | Admin password login |
| `/admin` | Dashboard with stats and conversation list |
| `/admin/conversations/[id]` | View a single conversation |

## Deploy on Vercel

This frontend is deployed as a **separate Vercel project** from the backend.

1. Create a new Vercel project linked to this repo.
2. Set **Root Directory** to `frontend`.
3. Add the environment variable:

   ```
   NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api
   ```

4. Deploy.

Framework preset (Next.js) and build settings are auto-detected.

### Checklist with backend

| Frontend (this project) | Backend |
|---------------------------|---------|
| Root Directory: `frontend` | Root Directory: `backend` |
| `NEXT_PUBLIC_API_URL` → backend URL | `CORS_ORIGIN` → frontend URL |
| — | `MONGODB_URI`, `GEMINI_API_KEY`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` |

Both projects must be redeployed after changing environment variables.

## Admin login in production

Admin auth uses HTTP-only cookies set by the backend. Because frontend and backend are on different Vercel domains, the backend must:

- Set `CORS_ORIGIN` to your frontend URL
- Use cross-site cookies (`SameSite=None; Secure`) in production

If login succeeds but you are not redirected to `/admin`, check the browser Network tab for a `Set-Cookie` header on the login response and verify backend env vars on Vercel.
