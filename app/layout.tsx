import "./globals.css";

import Header from "@/components/Header";
import GNB from "@/components/GNB";
import GNBToggleButton from "@/components/GNBToggleButton";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import FloatingTopButton from "@/components/FloatingTopButton";
import FloatingDevLinkButton from "@/components/FloatingDevLinkButton";
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
                <div className="fixed top-0 left-0 w-[var(--gnb-width)] h-[100vh] overflow-hidden transition-all duration-300">
                  <GNB />
                </div>

                <div className="fixed top-20 left-[var(--gnb-width)] group-hover:opacity-100 transition-all duration-300 z-30">
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
            <Footer />
          </div>
          <FloatingTopButton />
          <FloatingDevLinkButton />
        </body>
      </html>
    </PostProvider>
  );
}
