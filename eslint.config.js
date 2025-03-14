import globals from "globals";
import tseslint from "typescript-eslint";

import eslint from "@eslint/js";

export default tseslint.config(
	{ ignores: ["node_modules/", "public/"] },
	{
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommendedTypeChecked,
			...tseslint.configs.stylisticTypeChecked
		],
		files: ["**/*.{ts,tsx,js,jsx}"],
		languageOptions: {
			ecmaVersion: "latest",
			globals: globals.browser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		},
		rules: {
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/consistent-type-definitions": ["error", "type"],
			"@typescript-eslint/no-misused-promises": [
				"error",
				{
					checksVoidReturn: false
				}
			],
			"@typescript-eslint/only-throw-error": "off"
		}
	}
);
