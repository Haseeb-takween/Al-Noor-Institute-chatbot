import { checkCredentials, isAuthConfigured, signAdminToken } from "@/lib/server/auth";
import { json, fail } from "@/lib/server/http";

export const runtime = "nodejs";

// --- Simple in-memory rate limiter: 5 attempts / 15 min per IP ---
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

declare global {
  // eslint-disable-next-line no-var
  var _loginHits: Map<string, { count: number; resetAt: number }> | undefined;
}
const hits = (global._loginHits ??= new Map());

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return fail("Too many login attempts. Please wait 15 minutes and try again.", 429);
  }

  if (!isAuthConfigured()) {
    return fail(
      "Admin access is not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD and ADMIN_SESSION_SECRET.",
      503,
    );
  }

  let body: { email?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return fail("Email and password are required", 400);
  }

  const email = typeof body.email === "string" ? body.email : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password) return fail("Email and password are required", 400);

  if (!checkCredentials(email, password)) {
    return fail("Invalid credentials", 401);
  }

  return json({ token: signAdminToken() });
}
