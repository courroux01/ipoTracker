module.exports = {
  extends: ['next/core-web-vitals', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        semi: true,
        bracketSpacing: true,
        tabWidth: 2,
        printWidth: 80,
        endOfLine: 'crlf',
      },
    ],
    'linebreak-style': ['error', 'windows'],
  },
};

