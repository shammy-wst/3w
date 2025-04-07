// @ts-check

// Désactiver eslint pour cette ligne spécifique
// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require("next/jest");

// Désactiver la vérification de type TS pour cette ligne
// @ts-expect-error - nextJest n'a pas les types corrects
const createJestConfig = nextJest({
  dir: "./",
});

/**
 * @type {import('jest').Config}
 */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
