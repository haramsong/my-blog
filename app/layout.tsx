import "./globals.css";
import { Metadata } from "next";
import Script from "next/script";
import GoogleAnalytics from "@/components/GoogleAnalytics";

import Header from "@/components/Header";
import GNB from "@/components/GNB";
import GNBToggleButton from "@/components/GNBToggleButton";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import FloatingTopButton from "@/components/FloatingTopButton";
import FloatingDevLinkButton from "@/components/FloatingDevLinkButton";
import { PostProvider } from "@/context/PostContext";
import { getMetadata } from "@/lib/getMetaData";
import { getGNBTree, getTagsWithCount } from "@/lib/posts";

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata();
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tree = getGNBTree();
  const tags = getTagsWithCount();

  return (
    <PostProvider value={{ tree, tags }}>
      <html lang="ko" suppressHydrationWarning>
        <head>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
          <Script
            id="theme-change"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var stored = localStorage.getItem("theme");
                    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                    var isDark = stored === "dark" || (!stored && prefersDark);
                    var html = document.documentElement;
                    html.setAttribute("data-theme", isDark ? "dark" : "light");
                    html.style.colorScheme = isDark ? "dark" : "light";
                    if (isDark) {
                      html.classList.add("dark");
                    } else {
                      html.classList.remove("dark");
                    }
                  } catch(e) {}
                })();
              `,
            }}
          />
        </head>
        <body
          className={`bg-white text-black dark:bg-gray-900 dark:text-white`}
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-[var(--gnb-width)_1fr] lg:grid-cols-[var(--gnb-width)_1fr_250px] transition-all duration-300">
              <div className="hidden md:relative group md:block">
                <div className="fixed top-0 left-0 w-[var(--gnb-width)] h-full overflow-hidden transition-all duration-300">
                  <GNB />
                </div>

                <div className="fixed top-20 left-[var(--gnb-width)] group-hover:opacity-100 focus-within:opacity-100 transition-all duration-300 z-30">
                  <GNBToggleButton />
                </div>
              </div>

              <main
                id="main-content"
                role="main"
                className="relative flex justify-center max-w-full"
              >
                {children}
              </main>

              <div className="hidden lg:block">
                <div className="fixed top-16 right-0 w-[250px] h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide">
                  <Sidebar />
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
