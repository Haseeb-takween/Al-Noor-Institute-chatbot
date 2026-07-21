import jwt from "jsonwebtoken";

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

export function isAuthConfigured(): boolean {
  return (
    !!process.env.ADMIN_EMAIL &&
    !!process.env.ADMIN_PASSWORD &&
    !!process.env.ADMIN_SESSION_SECRET
  );
}

export function checkCredentials(email: string, password: string): boolean {
  return email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD;
}

export function signAdminToken(): string {
  return jwt.sign({ role: "admin" }, secret(), { expiresIn: "7d" });
}

/** Reads the Bearer token from the request and verifies it. */
export function isAdminRequest(req: Request): boolean {
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token || !secret()) return false;
  try {
    jwt.verify(token, secret());
    return true;
  } catch {
    return false;
  }
}
