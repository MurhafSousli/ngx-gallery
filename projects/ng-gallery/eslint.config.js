// @ts-check
const { defineConfig } = require("eslint/config");
const rootConfig = require("../../eslint.config.js");

const storybook = require("eslint-plugin-storybook");

module.exports = defineConfig([
  ...rootConfig,
  {
    files: ["**/*.ts"],
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "",
          style: "kebab-case",
        },
      ],
      "@angular-eslint/component-class-suffix": 0,
      "@angular-eslint/directive-class-suffix": 0,
      "@angular-eslint/no-input-rename": 0,
      "@angular-eslint/no-output-rename": 0,
      "@angular-eslint/no-output-native": 0,
      "@angular-eslint/no-host-metadata-property": 0,
      "@angular-eslint/template/alt-text": 0,
      "@typescript-eslint/no-inferrable-types": 0,
      "@typescript-eslint/no-explicit-any": 0,
    },
  },
  {
    files: ["**/*.html"],
    rules: {
      "@angular-eslint/template/alt-text": 0
    },
  },
  {
    files: ["**/*.stories.ts"],
    extends: [...storybook.configs["flat/recommended"]],
  }
]);
