const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

export async function getViewCount(slug: string): Promise<number> {
  const res = await fetch(
    `${API_ENDPOINT}/view-count?slug=${encodeURIComponent(slug)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-token": process.env.NEXT_PUBLIC_API_SECRET ?? "",
      },
    }
  );

  if (!res.ok) throw new Error(`Error fetching views: ${res.statusText}`);

  const data = await res.json();
  return data.views ?? 0;
}

export async function increaseViewCount(slug: string): Promise<number> {
  const res = await fetch(`${API_ENDPOINT}/view-count`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-token": process.env.NEXT_PUBLIC_API_SECRET ?? "",
    },
    body: JSON.stringify({ slug }),
  });

  if (!res.ok) throw new Error(`Error increasing views: ${res.statusText}`);

  const data = await res.json();
  return data.views ?? 0;
}
