module.exports = {
    testEnvironment: "node",
    testMatch: ["**/test/**/*.test.js"],
    transform: {},
    moduleNameMapper: {
        "^@ostro/support/(.*)$": "<rootDir>/../support/$1",
        "^@ostro/support$": "<rootDir>/../support",
        "^@ostro/contracts/(.*)$": "<rootDir>/../contracts/$1",
        "^@ostro/contracts$": "<rootDir>/../contracts"
    },
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov", "clover"],
    collectCoverageFrom: [
        "<rootDir>/**/*.js",
        "!<rootDir>/test/**",
        "!<rootDir>/coverage/**",
        "!<rootDir>/node_modules/**",
        "!<rootDir>/jest.config.js"
    ]
};
