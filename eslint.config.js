import tseslint from "typescript-eslint";

import eslint from "@eslint/js";

export default [
	{
		ignores: ["node_modules/", "public/"]
	},
	...tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked, {
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		},
		rules: {
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-misused-promises": [
				"error",
				{
					checksVoidReturn: false
				}
			]
		}
	})
];
