export default {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist/", "node_modules/"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
  },
};