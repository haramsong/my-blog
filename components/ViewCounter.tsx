"use client";

import { useEffect, useState } from "react";

import { increaseViewCount } from "@/lib/api/view";

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
    async function fetchViews() {
      try {
        const currentViews = await increaseViewCount(slug);
        setViews(currentViews);
      } catch (err) {
        console.error(err);
      }
    }

    fetchViews();
  }, [slug]);

  return <p>{`${formatViews(views)}`}</p>;
}
