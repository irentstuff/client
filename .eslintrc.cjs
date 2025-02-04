module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    jest: true,
    browser: true,
    amd: true,
    node: true
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended' // Make this the last element so prettier config overrides other formatting rules
  ],
  rules: {
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'object-literal-shorthand': 'off',
    'spaced-comment': 'off',
    'react/jsx-boolean-value': 'off',
    'import/order': 'off',
    'react/function-component-definition': 'off',
    'no-console': 'off',
    'prefer-const': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': 'warn',
    camelcase: 'warn',
    'react/no-unstable-nested-components': ['warn', { allowAsProps: true }]
  }
}
