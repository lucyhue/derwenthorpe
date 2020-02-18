module.exports = {
	parserOptions: {
		ecmaVersion: 2017, // Required for certain syntax usages
	},
	plugins: [
		'promise'
	],
	extends: 'eslint:recommended',
	rules: {
		'no-console': 'off', // Removed rule 'disallow the use of console' from recommended eslint rules
		'no-regex-spaces': 'off', // Removed rule 'disallow multiple spaces in regular expressions' from recommended eslint rules
		'no-debugger': 'off', // Removed rule 'disallow the use of debugger' from recommended eslint rules
		'no-unused-vars': 'off', // Removed rule 'disallow unused variables' from recommended eslint rules
		'no-mixed-spaces-and-tabs': 'off', // Removed rule 'disallow mixed spaces and tabs for indentation' from recommended eslint rules
		'no-undef': 'off', // Removed rule 'disallow the use of undeclared variables unless mentioned in /*global */ comments' from recommended eslint rules
		'no-template-curly-in-string': 1, // Warn against template literal placeholder syntax in regular strings
		'consistent-return': 1, // Warn if return statements do not either always or never specify values
		'array-callback-return': 1, // Warn if no return statements in callbacks of array methods
		'eqeqeq': 2, // Require the use of === and !==
		'no-alert': 2, // Disallow the use of alert, confirm, and prompt
		'no-caller': 2, // Disallow the use of arguments.caller or arguments.callee
		'no-eq-null': 2, // Disallow null comparisons without type-checking operators
		'no-eval': 2, // Disallow the use of eval()
		'no-extend-native': 1, // Warn against extending native types
		'no-extra-bind': 1, // Warn against unnecessary calls to .bind()
		'no-extra-label': 1, // Warn against unnecessary labels
		'no-floating-decimal': 2, // Disallow leading or trailing decimal points in numeric literals
		'no-implicit-coercion': 1, // Warn against shorthand type conversions
		'no-loop-func': 1, // Warn against function declarations and expressions inside loop statements
		'no-new-func': 2, // Disallow new operators with the Function object
		'no-new-wrappers': 1, // Warn against new operators with the String, Number, and Boolean objects
		'no-throw-literal': 2, // Disallow throwing literals as exceptions
		'prefer-promise-reject-errors': 2, // Require using Error objects as Promise rejection reasons
		'for-direction': 2, // Enforce “for” loop update clause moving the counter in the right direction
		'getter-return': 2, // Enforce return statements in getters
		'no-await-in-loop': 2, // Disallow await inside of loops
		'no-compare-neg-zero': 2, // Disallow comparing against -0
		'no-catch-shadow': 1, // Warn against catch clause parameters from shadowing variables in the outer scope
		'no-shadow-restricted-names': 2, // Disallow identifiers from shadowing restricted names
		'callback-return': 2, // Enforce return statements in callbacks of array methods
		'handle-callback-err': 2, // Require error handling in callbacks
		'no-path-concat': 1, // Warn against string concatenation with __dirname and __filename
		'prefer-arrow-callback': 1, // Prefer using arrow functions for callbacks
		'promise/always-return': 2, // Return inside each then() to create readable and reusable Promise chains. Forces developers to return console logs and http calls in promises.
		'promise/catch-or-return': 2, //Enforces the use of catch() on un-returned promises
		'promise/no-nesting': 1 // Warn against nested then() or catch() statements
	}
}
