import nextConfig from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";

const eslintConfig = [
  ...nextConfig,
  ...tseslint.configs.recommended,
  {
    rules: {
      // useEffect 내 setState는 외부 시스템 동기화(테마, URL 등)에서 필요
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default eslintConfig;
