const isExisty = (value) => {
	return value !== null && value !== undefined;
};

const isEmpty = (value) => {
	if (value instanceof Array) {
		return value.length === 0;
	}
	return value === '' || !isExisty(value);
};

const isEmptyTrimed = (value) => {
	if (typeof value === 'string') {
		return value.trim() === '';
	}
	return true;
};

export const validators = {
	isEmpty: value => isEmpty(value),
	isRequired: value => !isEmptyTrimed(value),

	matchRegexp: (value, regexp) => {
		const validationRegexp = (regexp instanceof RegExp ? regexp : (new RegExp(regexp)));
		return (isEmpty(value) || validationRegexp.test(value));
	},
	isEmail: value => validators.matchRegexp(value, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i), // eslint-disable-line

	isNumber: value => validators.matchRegexp(value, /^-?[0-9]\d*(\d+)?$/i),
	isFloat: value => validators.matchRegexp(value, /^(?:-?[1-9]\d*|-?0)?(?:\.\d+)?$/i),
	isPositive: (value) => {
		if (isExisty(value)) {
			return (validators.isNumber(value) || validators.isFloat(value)) && value >= 0;
		}
		return true;
	},

	maxNumber: (value, rule) => isEmpty(value) || parseInt(value, 10) <= parseInt(rule.compareWith, 10),
	minNumber: (value, rule) => isEmpty(value) || parseInt(value, 10) >= parseInt(rule.compareWith, 10),
	maxFloat: (value, rule) => isEmpty(value) || parseFloat(value) <= parseFloat(rule.compareWith),
	minFloat: (value, rule) => isEmpty(value) || parseFloat(value) >= parseFloat(rule.compareWith),

	isString: value => !isEmpty(value) || typeof value === 'string' || value instanceof String,
	hasMinStringLength: (value, rule) => validators.isString(value) && value.length >= rule.compareWith,
	hasMaxStringLength: (value, rule) => validators.isString(value) && value.length <= rule.compareWith,

	isTruthy: (value) => value === true,
	isFalsey: (value) => value === false,

	isFile: value => value instanceof File, // eslint-disable-line no-undef
	maxFileSize: (value, rule) => validators.isFile(value) && value.size <= parseInt(rule.compareWith, 10),
	allowedExtensions: (value, rule) => validators.isFile(value) && rule.compareWith.split(',').indexOf(value.type) !== -1,
};
