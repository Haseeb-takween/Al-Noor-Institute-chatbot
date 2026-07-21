/** JSON response helper. */
export function json(data: unknown, status = 200, headers?: HeadersInit): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

/** Error response shaped as { message } — matches the frontend fetch helpers. */
export function fail(message: string, status = 400): Response {
  return json({ message }, status);
}

export function isValidObjectId(id: string): boolean {
  return /^[a-f\d]{24}$/i.test(id);
}
