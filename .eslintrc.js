module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  plugins: ["unicorn"],
  extends: ["eslint:recommended"],
  rules: {
    "unicorn/prefer-node-protocol": "error",
  },
};
