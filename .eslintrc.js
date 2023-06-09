module.exports = {
    env: {
        browser: true,
        es6: true,
        // jest: true,
        node: true,
    },
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        // 'plugin:jest/recommended',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
        'plugin:react/recommended',
        'plugin:cypress/recommended',
        'plugin:prettier/recommended',
    ],
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    plugins: ['react', 'jsx-a11y', 'import', 'react-hooks', '@typescript-eslint'],
    rules: {
        'no-console': [1],
        "react/no-unknown-property": [
            2,
            {
                "ignore": [
                    "jsx"
                ]
            }
        ],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
                arrowParens: 'avoid',
                printWidth: 120,
            },
        ],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        'linebreak-style': 'off',
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'object-curly-spacing': ['error', 'always'],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': 0,
        'react/no-did-mount-set-state': 0,
        'react/display-name': 0,
        'react/jsx-indent': 0,
        'react/no-array-index-key': 0,
        'react/prefer-stateless-function': 0,
        'react/forbid-prop-types': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/button-has-type': 0,
        'react/require-default-props': 0,
        'react/jsx-wrap-multilines': 0,
        'react/no-did-update-set-state': 0,
        'react/jsx-closing-bracket-location': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/label-has-associated-control': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/label-has-for': 0,
        // 'redux-saga/no-yield-in-race': 2,
        // 'redux-saga/yield-effects': 2,
        // 'import/no-unresolved': 0,
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE', 'PascalCase', 'snake_case'],
            },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        '@typescript-eslint/ban-ts-comment': 'off',
        'import/no-extraneous-dependencies': 'off',
        'symbol-description': 'off',
        'no-param-reassign': 'off',
        'import/prefer-default-export': 'off',
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-underscore-dangle': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'consistent-return': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        'max-classes-per-file': 'off',
        '@typescript-eslint/ban-types': 'off',
        'jsx-a11y/no-noninteractive-tabindex': 'off',
        'jsx-a11y/img-redundant-alt': 'off',
        'no-alert': 'off',
        'no-plusplus': 'off',
        'no-continue': 'off',
        // Testing rules
        // 'jest/expect-expect': 'off'
    },
};
