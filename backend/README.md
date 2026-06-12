# AI Chatbot Backend

Express.js API for the Al-Noor Institute chatbot. Handles chat via Google Gemini, conversation storage in MongoDB, and a password-protected admin dashboard API.

## Tech stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express 5
- **Database:** MongoDB (Mongoose)
- **AI:** Google Gemini (`@google/genai`)
- **Auth:** JWT session cookies (admin only)

## Project structure

```
backend/
├── api/index.ts          # Vercel serverless entry point
├── prompts/              # System prompt and knowledge base (markdown)
├── src/
│   ├── config/           # Environment and CORS config
│   ├── controllers/      # Route handlers
│   ├── lib/              # DB and Gemini clients
│   ├── middleware/       # Auth, errors, not-found
│   ├── models/           # Mongoose models
│   └── routes/           # API route definitions
└── vercel.json           # Vercel deployment config
```

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/)
- MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- Google Gemini API key

## Local setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

3. Start the dev server:

```bash
pnpm dev
```

The API runs at `http://localhost:3000`.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | No | `development` or `production` (Vercel sets this automatically) |
| `PORT` | No | Server port (default: `3000`) |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `GEMINI_API_KEY` | Yes | Google Gemini API key |
| `ADMIN_PASSWORD` | Yes | Password for the admin dashboard |
| `ADMIN_SESSION_SECRET` | Yes | Long random string for signing JWT session tokens |
| `CORS_ORIGIN` | Yes (prod) | Comma-separated frontend URLs allowed to call the API |

**Local example:**

```env
CORS_ORIGIN=http://localhost:3001
```

**Production example:**

```env
CORS_ORIGIN=https://your-frontend.vercel.app
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with hot reload |
| `pnpm build` | Compile TypeScript to `dist/` |
| `pnpm start` | Run compiled production build |
| `pnpm typecheck` | Type-check without emitting files |

## API routes

Base URL: `/api`

### Health

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Server and database health check |

### Chat

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/chat` | Send a message and receive an AI reply |

**Body:**

```json
{
  "conversationId": "optional-existing-id",
  "message": "Hello"
}
```

### Conversations (public)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/conversations` | List all conversations |
| `GET` | `/conversations/:id` | Get a conversation with messages |
| `POST` | `/conversations` | Create a new conversation |
| `DELETE` | `/conversations/:id` | Delete a conversation |

### Admin (cookie auth required)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/admin/login` | Log in with admin password |
| `POST` | `/admin/logout` | Clear admin session |
| `GET` | `/admin/session` | Check if session is valid |
| `GET` | `/admin/stats` | Total conversations and messages |
| `GET` | `/admin/conversations` | Paginated conversation list |
| `GET` | `/admin/conversations/:id` | Full conversation detail |

Admin login is rate-limited to 5 attempts per 15 minutes.

## Deploy on Vercel

This backend is deployed as a **separate Vercel project** from the frontend.

1. Create a new Vercel project linked to this repo.
2. Set **Root Directory** to `backend`.
3. Add all environment variables from the table above.
4. Set `CORS_ORIGIN` to your frontend URL (exact match, including `https://`).
5. Deploy.

Vercel uses `api/index.ts` and `vercel.json` to run Express as a serverless function.

### Production cookie notes

Frontend and backend are on different Vercel domains (cross-site). Admin session cookies use `SameSite=None; Secure` in production. Make sure:

- `CORS_ORIGIN` includes your frontend URL
- The frontend sends requests with `credentials: "include"` (already configured)

## Customizing the chatbot

Edit the markdown files in `prompts/`:

- `system-prompt.md` — bot personality and behavior rules
- `knowledge-base.md` — institute-specific information the bot can reference
