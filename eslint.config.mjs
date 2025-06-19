import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ['dist/**', 'build/**', 'node_modules/**', '.next/**'],
    },
    {
        files: ['**/*.{ts,tsx,js,jsx}', 'src/**/*.ts', 'src/**/*.tsx'],
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
        },
        languageOptions: {
            globals: {
                console: 'readonly',
                window: 'readonly',
                document: 'readonly',
                localStorage: 'readonly',
                sessionStorage: 'readonly',
                fetch: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                URL: 'readonly',
                FileReader: 'readonly',
                File: 'readonly',
                Image: 'readonly',
                WebSocket: 'readonly',
                HTMLDivElement: 'readonly',
                HTMLButtonElement: 'readonly',
                HTMLInputElement: 'readonly',
                MouseEvent: 'readonly',
                Node: 'readonly',
                React: 'readonly',
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'react/jsx-key': 'error',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'off',
            'react/jsx-no-useless-fragment': ['warn', { allowExpressions: false }],
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-require-imports': 'error',
            '@typescript-eslint/no-namespace': 'off',
            'no-console': 'off',
            'no-undef': 'error',
        },
    },
    {
        files: [
            'next.config.js',
            'tailwind.config.js',
            'postcss.config.js',
            'next-i18next.config.js',
        ],
        languageOptions: {
            globals: {
                module: 'readonly',
                require: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
            },
        },
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    {
        files: ['cypress/**/*.{ts,js}', 'cypress.config.ts'],
        languageOptions: {
            globals: {
                cy: 'readonly',
                Cypress: 'readonly',
                expect: 'readonly',
                assert: 'readonly',
                before: 'readonly',
                after: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                context: 'readonly',
                process: 'readonly',
            },
        },
        rules: {
            '@typescript-eslint/no-namespace': 'off',
        },
    },
];
