module.exports = {
  "extends": "next",
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'off', // Change to 'warn' or 'off' if you want to suppress it
      {
        argsIgnorePattern: '^_', // Ignore unused variables starting with '_'
        varsIgnorePattern: '^_', // Ignore unused imports/variables starting with '_'
      },
    ],
  },
}
