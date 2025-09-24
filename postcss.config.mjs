const config = {
  plugins: ["@tailwindcss/postcss"],
  cssnano: {
    preset: ["default", { discardComments: { removeAll: true } }],
  },
};

export default config;
