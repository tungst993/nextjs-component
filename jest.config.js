/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: ['node_modules', 'src/core', 'src'],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/const\\.',
        '/api\\.',
        '/model\\.',
        '/style\\.',
        '/slice\\.',
        '/saga\\.',
        '/consts\\.',
        '/apis\\.',
        '/context\\.',
    ],
    transform: {
        '^.+\\.css$': 'jest-styled-jsx-transformer',
        '^.+\\.(t|j)sx?': 'babel-jest',
        '^.+\\.svg$': 'jest-transform-stub',
    },
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
    },
};
