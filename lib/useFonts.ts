import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    {
      path: "../public/fonts/PretendardVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-pretendard",
  fallback: ["system-ui", "sans-serif"],
  preload: true,
});

export const champignon = localFont({
  src: "../public/fonts/Champignon.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-champignon",
});

export const firaCode = localFont({
  src: "../public/fonts/FiraCode-Medium.woff2",
  weight: "500",
  style: "normal",
  variable: "--font-firacode",
});
