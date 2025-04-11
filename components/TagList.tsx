"use client";

interface TagListProps {
  sortedTags: [string, number][];
}

export default function TagList({ sortedTags }: TagListProps) {
  return (
    <div>
      <h2 className="font-semibold mb-2">Tags</h2>
      <ul className="text-sm text-gray-700 space-y-1">
        {sortedTags.map(([tag, count]) => (
          <li key={tag}>
            #{tag} ({count})
          </li>
        ))}
      </ul>
    </div>
  );
}
