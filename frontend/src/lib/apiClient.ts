const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const authHeaders = (): HeadersInit => {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `Request failed with ${res.status}`);
  }
  // Some endpoints (e.g., DELETE) may return no content
  const text = await res.text();
  if (!text) return undefined as T;
  try {
    return JSON.parse(text) as T;
  } catch (err) {
    throw new Error("Invalid JSON response");
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "GET",
      headers: authHeaders(),
    });
    return handle<T>(res);
  } catch (err) {
    throw new Error(
      "Network error: unable to reach API. Is the backend running and NEXT_PUBLIC_API_BASE correct?"
    );
  }
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(body),
    });
    return handle<T>(res);
  } catch (err) {
    throw new Error(
      "Network error: unable to reach API. Is the backend running and NEXT_PUBLIC_API_BASE correct?"
    );
  }
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(body),
    });
    return handle<T>(res);
  } catch (err) {
    throw new Error(
      "Network error: unable to reach API. Is the backend running and NEXT_PUBLIC_API_BASE correct?"
    );
  }
}

export async function apiDelete<T = void>(path: string): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    return handle<T>(res);
  } catch (err) {
    throw new Error(
      "Network error: unable to reach API. Is the backend running and NEXT_PUBLIC_API_BASE correct?"
    );
  }
}
