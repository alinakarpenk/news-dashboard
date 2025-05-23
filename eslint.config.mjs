import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
  extends: "next/core-web-vitals",
  rules: {
    'no-dupe-args' : "error",
    'no-duplicate-imports' : "error",
    'no-self-compare' : "error",
    'no-use-before-define' : "error",
  }

})

];

export default eslintConfig;
