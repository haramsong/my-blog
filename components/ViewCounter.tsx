// components/ViewCounter.tsx
"use client";

import { useEffect, useState } from "react";

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number>(0);

  function formatViews(num: number): string {
    if (num >= 1_000_000)
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + " M";
    if (num >= 1_000)
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + " K";
    return num.toString();
  }

  useEffect(() => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/view-count`;
    if (!endpoint) {
      console.error("API endpoint is not defined");
      return;
    }

    const increaseViews = async () => {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-token": process.env.NEXT_PUBLIC_API_SECRET ?? "",
          },
          body: JSON.stringify({ slug }),
        });

        const data = await res.json();
        setViews(data.views ?? 0);
      } catch (err) {
        console.error("조회수 증가 실패:", err);
      }
    };

    increaseViews();
  }, [slug]);

  return <p>{`${formatViews(views)}`}</p>;
}
