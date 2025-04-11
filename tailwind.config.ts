// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            fontFamily: '"Pretendard", system-ui, sans-serif',
            color: theme("colors.gray.800"),
            a: {
              color: theme("colors.blue.600"),
              textDecoration: "underline",
              fontWeight: "500",
              "&:hover": {
                color: theme("colors.blue.700"),
              },
            },
            h1: {
              fontWeight: "700",
              fontSize: theme("fontSize.3xl")[0],
              marginBottom: theme("spacing.4"),
            },
            h2: {
              fontWeight: "600",
              fontSize: theme("fontSize.2xl")[0],
              marginTop: theme("spacing.8"),
              marginBottom: theme("spacing.2"),
            },
            h3: {
              fontWeight: "600",
              fontSize: theme("fontSize.xl")[0],
            },
            ul: {
              paddingLeft: theme("spacing.6"),
              marginBottom: theme("spacing.4"),
              listStyleType: "disc",
            },
            ol: {
              paddingLeft: theme("spacing.6"),
              marginBottom: theme("spacing.4"),
              listStyleType: "decimal",
            },
            code: {
              backgroundColor: theme("colors.gray.100"),
              color: theme("colors.pink.600"),
              padding: "0.2em 0.4em",
              borderRadius: theme("borderRadius.md"),
              fontSize: "0.875em",
            },
            pre: {
              backgroundColor: theme("colors.gray.900"),
              color: theme("colors.gray.100"),
              padding: theme("spacing.4"),
              borderRadius: theme("borderRadius.lg"),
              overflowX: "auto",
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.300"),
              fontStyle: "italic",
              paddingLeft: theme("spacing.4"),
              color: theme("colors.gray.600"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.100"),
            a: { color: theme("colors.blue.400") },
            code: {
              backgroundColor: theme("colors.gray.800"),
              color: theme("colors.pink.400"),
            },
            pre: {
              backgroundColor: theme("colors.gray.800"),
              color: theme("colors.gray.100"),
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.600"),
              color: theme("colors.gray.300"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
