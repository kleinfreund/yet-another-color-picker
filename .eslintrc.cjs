/** @type {import('eslint').Linter.Config} */ const config = {
	extends: ['standard'],
	rules: {
		// Necessary to use tabs for indentation.
		'no-tabs': ['error', { allowIndentationTabs: true }],
		indent: ['error', 'tab', { SwitchCase: 1 }],
		// Other rules.
		'comma-dangle': ['error', 'always-multiline'],
		'space-before-function-paren': ['error', 'always'],
		// Avoids false errors like “'HTMLElement' is not defined.”.
		'no-undef': 'off',
	},
}

module.exports = config
