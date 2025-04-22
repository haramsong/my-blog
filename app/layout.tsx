import "./globals.css";
import GNB from "@/components/GNB";
import GNBToggleButton from "@/components/GNBToggleButton";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { PostProvider } from "@/context/PostContext";
import { getPostMetaTree, getTagsWithCount } from "@/lib/posts";

export const metadata = {
  title: "Haram's 개발 Blog",
  description: "Haram's 개발 Blog 입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tree = getPostMetaTree();
  const tagCounts = getTagsWithCount();

  return (
    <PostProvider value={tree}>
      <html lang="en" className="">
        <body
          className={`bg-white text-black dark:bg-gray-900 dark:text-white`}
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-[var(--gnb-width)_1fr] lg:grid-cols-[var(--gnb-width)_1fr_250px] transition-all duration-300">
              {/* 좌측 GNB */}
              <div className="hidden md:relative group md:block">
                <div className="fixed top-16 left-0 w-[var(--gnb-width)] h-[calc(100vh-4rem)] overflow-hidden transition-all duration-300">
                  <GNB />
                </div>

                <div className="absolute group-hover:opacity-100 top-[calc(0.75rem)] left-[var(--gnb-width)] transition-all duration-300 z-30">
                  <GNBToggleButton />
                </div>
              </div>

              {/* 본문 */}
              <main className="max-w-full">{children}</main>

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
    </PostProvider>
  );
}
