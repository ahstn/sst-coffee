module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module'
    },
    env: {
      es6: true,
      node: true,
      jest: true,
    },
    ignorePatterns: ['node_modules', 'build', 'coverage', '.eslintrc.js', 'test', 'jest.config.ts'],
    plugins: ['import', 'eslint-comments', 'promise'],
    extends: [
      'eslint:recommended',
      'plugin:eslint-comments/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/typescript',
      'plugin:promise/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended'
    ],
    globals: { 'BigInt': true, 'console': true, 'WebAssembly': true },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'eslint-comments/disable-enable-pair': [
        'error',
        { allowWholeFile: true }
      ],
      'eslint-comments/no-unused-disable': 'error',
      'import/order': [
        'error',
        { 'alphabetize': { order: 'asc' } }
      ],
      'sort-imports': [
        'error',
        { ignoreDeclarationSort: true, ignoreCase: true }
      ],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    }
  };
