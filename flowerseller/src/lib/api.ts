const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function apiFetch(
  path: string,
  opts: {
    method?: string;
    body?: unknown;
    token?: string | null;
  } = {}
): Promise<Response> {
  const { method = "GET", body, token } = opts;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  return res;
}

export async function apiGet<T>(path: string, token?: string | null): Promise<T> {
  const res = await apiFetch(path, { token });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export async function apiPost<T>(
  path: string,
  body: unknown,
  token?: string | null
): Promise<T> {
  const res = await apiFetch(path, { method: "POST", body, token });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export async function apiPatch(
  path: string,
  body: unknown,
  token?: string | null
): Promise<void> {
  const res = await apiFetch(path, { method: "PATCH", body, token });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
}

export async function apiDelete(path: string, token?: string | null): Promise<void> {
  const res = await apiFetch(path, { method: "DELETE", token });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
}

export function getAuthToken(cookieHeader?: string | null): string | null {
  if (typeof document !== "undefined") {
    const m = document.cookie.match(/auth=([^;]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  }
  if (cookieHeader) {
    const m = cookieHeader.match(/auth=([^;]+)/);
    return m ? decodeURIComponent(m[1].trim()) : null;
  }
  return null;
}
