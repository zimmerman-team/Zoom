// TODO: expand configuration and autoformat on save
module.exports = {
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier'],
  rules: {
    'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx'] }],
    'react/jsx-no-duplicate-props': [
      'error',
      {
        ignoreCase: false,
      },
    ],
    'react/jsx-max-depth': [
      'error',
      {
        max: 4,
      },
    ],
    'react/boolean-prop-naming': [
      'error',
      {
        rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
      },
    ],
    'react/prop-types': 0,
    'react/jsx-no-bind': false,
    'no-underscore-dangle': 0,
    'import/imports-first': ['warning', 'absolute-first'],
    'import/newline-after-import': 'warning',
    'react/prefer-stateless-function': 'off',
  },
};
