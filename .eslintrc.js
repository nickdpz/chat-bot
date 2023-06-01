module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    env: {
        node: true,
        commonjs: true,
        es2022: true
    },
    plugins: ['jest', 'prettier'],
    extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
    rules: {
        indent: 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'prettier/prettier': [
            'warn',
            { singleQuote: true, endOfLine: 'auto', tabWidth: 4 },
            {
                usePrettierrc: true
            }
        ]
    },
    overrides: []
};
