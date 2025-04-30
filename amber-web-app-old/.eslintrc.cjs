module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ["@remix-run/eslint-config", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
