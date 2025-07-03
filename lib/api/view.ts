import { api } from "./";

interface ViewResponse {
  views: number;
}

export async function getViewCount(slug: string): Promise<number> {
  const data = await api.get<ViewResponse>(
    `/view-count?slug=${encodeURIComponent(slug)}`
  );

  return data.views ?? 0;
}

export async function increaseViewCount(slug: string): Promise<number> {
  const data = await api.post<ViewResponse>("/view-count", { slug });

  return data.views ?? 0;
}
