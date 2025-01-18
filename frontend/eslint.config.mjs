import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"), // 기본 설정 유지
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // ESLint가 적용될 파일 지정
    rules: {
      "react/react-in-jsx-scope": "off",   // React 17 이상에서 JSX 범위 규칙 비활성화
      "no-console": "warn",               // console.log는 경고만 표시
      "no-debugger": "warn",              // debugger는 경고만 표시
      "react/no-unescaped-entities": "off", // HTML 엔티티 관련 경고 비활성화
      "jsx-a11y/anchor-is-valid": "off",  // Next.js에서 Link 컴포넌트 관련 경고 비활성화
      "no-unused-vars": ["warn", { vars: "all", args: "none", ignoreRestSiblings: true }], // 미사용 변수에 대해 경고만 표시
    },
  },
];

export default eslintConfig;
