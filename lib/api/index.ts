const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "";
const API_TOKEN = process.env.NEXT_PUBLIC_API_SECRET || "";

async function request<T>(url: string, options: RequestInit): Promise<T> {
  const res = await fetch(`${API_ENDPOINT}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-api-token": API_TOKEN,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export const api = {
  get: <T>(url: string) => request<T>(url, { method: "GET" }),

  post: <T>(url: string, body: unknown) =>
    request<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
