module.exports = {
  root: true,
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['jest'],
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
}
