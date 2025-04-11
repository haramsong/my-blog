import "./globals.css";
import { Inter } from "next/font/google";
import GNB from "@/components/GNB";
import Sidebar from "@/components/Sidebar";
import { getPostMetaTree, getTagsWithCount } from "@/lib/posts";
import Header from "@/components/Header"; // 👈 추가

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Blog",
  description: "SSG Blog with Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tree = getPostMetaTree();
  const tagCounts = getTagsWithCount();

  return (
    <html lang="en" className="">
      <body
        className={`${inter.className} bg-white text-black dark:bg-gray-900 dark:text-white`}
      >
        <div className="flex flex-col min-h-screen">
          <Header /> {/* fixed 또는 sticky로 처리 */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-[250px_1fr_250px]">
            {/* 좌측 GNB */}
            <div className="hidden md:block">
              <div className="fixed top-16 left-0 w-[250px] h-[calc(100vh-4rem)] overflow-y-auto">
                <GNB tree={tree} />
              </div>
            </div>

            {/* 본문 */}
            <main className="p-4 max-w-full">{children}</main>

            {/* 우측 TOC/Sidebar */}
            <div className="hidden lg:block">
              <div className="fixed top-16 right-0 w-[250px] h-[calc(100vh-4rem)] overflow-y-auto">
                <Sidebar tagCounts={tagCounts} />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
