import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'

export default [
	{
		files: ['**/*.js'],
		languageOptions: { sourceType: 'script' }
	},
	{
		languageOptions: { globals: globals.browser }
	},
	{
		files: ['**/*.jsx'],
		languageOptions: {
			parserOptions: { ecmaFeatures: { jsx: true } }
		}
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReactConfig,
	{
		rules: {
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'react/react-in-jsx-scope': 'off',
			'prefer-const': 'warn'
		}
	}
]
