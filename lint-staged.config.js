/*
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  // Run Prettier on staged CSS and JSON files
  '*.{css,json,md}': ['prettier --write'],
  // Run ESLint and Prettier on all staged JavaScript and TypeScript files
  '*.{js,ts,jsx,tsx}': ['eslint --fix', 'prettier --write'],
};
