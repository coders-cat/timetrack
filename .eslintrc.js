module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'react/prop-types': 1,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
