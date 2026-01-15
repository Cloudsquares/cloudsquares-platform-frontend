import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import pluginJest from "eslint-plugin-jest";
import tsParser from "@typescript-eslint/parser";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "node_modules",
      "coverage",
      "vite.config.ts",
      "tailwind.config.ts",
    ],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...pluginQuery.configs["flat/recommended"],
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        "jest/globals": true,
      },
      parser: tsParser,
      parserOptions: {
        tsconfigRootDir: process.cwd(), // Указывает корневую папку проекта
        project: "./tsconfig.json", // Указывает путь к tsconfig.json
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      jest: pluginJest,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      eqeqeq: ["warn", "always"], // Использовать строгое сравнение (=== и !==)
      // indent: ["warn", 2, { SwitchCase: 1 }], // Используем 2 пробела. Выключил - ловим баги с зацикливанием и рекурсией при большой вложенности tsx, оставим форматирование Prettier'y
      semi: ["warn", "always"], // Всегда закрываем строки ;
      "prefer-const": "warn", // Для констант используем const, не let
      // "react-refresh/only-export-components": "off", // Отключение правила, которое запрещает экспортировать * из файлов компонентов
      "arrow-parens": ["warn", "always"], // Всегда использовать скобки вокруг параметров стрелочных функций
      "comma-dangle": ["warn", "always-multiline"], // Запятая в конце многострочных конструкций
      "object-curly-spacing": ["warn", "always"], // Пробелы внутри фигурных скобок

      "no-console": "warn", // Не отправляем в билд консоль.логи
      "no-implicit-globals": "warn", // Запретить глобальные переменные
      "no-shadow": "warn", // Запретить затенение переменных
      // "no-unused-vars": [
      //   "warn",
      //   { vars: "all", args: "after-used", ignoreRestSiblings: true },
      // ], // Избегать неиспользуемых переменных

      "@typescript-eslint/no-explicit-any": "error", // Избегать использования `any`
      "@typescript-eslint/no-empty-interface": "error", // Запрет пустых интерфейсов
      "@typescript-eslint/prefer-optional-chain": "warn", // Предпочитать optional chainin
    },
  },
  {
    // Jest tests
    files: ["**/*.spec.ts", "**/*.test.ts", "**/*.spec.tsx", "**/*.test.tsx"],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      "jest/no-disabled-tests": "warn", // Предупреждает о пропущенных (test.skip) тестах
      "jest/no-focused-tests": "error", // Запретить использовать test.only
      "jest/no-identical-title": "error", // Запретить использовать одинаковые названия для тестов
      "jest/prefer-to-have-length": "warn", // Напоминает использовать toHaveLength() вместо toBe()
      "jest/valid-expect": "error", // Проверка на использование expect()
      "jest/no-commented-out-tests": "warn", // Запретить закомментированные тесты
    },
  },
);
