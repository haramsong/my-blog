export default function Footer() {
  return (
    <footer
      className="relative w-full h-[100px] border-t mt-10 py-6 text-center text-sm text-gray-500 z-40"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        borderColor: "var(--border)",
      }}
    >
      <div>
        Contact:{" "}
        <a href="mailto:alakazam1324@gmail.com" className="underline">
          alakazam1324@gmail.com
        </a>
      </div>
      <div>
        Copyright © {new Date().getFullYear()} haramsong. All rights reserved.
      </div>
    </footer>
  );
}
