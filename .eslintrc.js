module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-mixed-spaces-and-tabs': 2,
    indent: [2, 2],
    /* Variable cames */
    camelcase: 2,
    /* Language constructs */
    curly: 2,
    eqeqeq: [2, 'smart'],
    'func-style': [2, 'expression'],
    'no-var': 2,
    'prefer-const': 2,
    /* Semicolons */
    semi: 2,
    'no-extra-semi': 2,
    /* Padding & additional whitespace (preferred but optional) */
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    'semi-spacing': 1,
    'key-spacing': 1,
    'block-spacing': 1,
    'comma-spacing': 1,
    'no-multi-spaces': 1,
    'space-before-blocks': 1,
    'keyword-spacing': [1, { before: true, after: true }],
    'space-infix-ops': 1,
    /* Minuta */
    'comma-style': [2, 'last'],
    quotes: [1, 'single'],
    'eol-last': 0,
    'no-trailing-spaces': 0,
    'spaced-comment': 0,
    'no-console': 0,
  },
};
