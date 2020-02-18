const { isEmpty } = require('../util/validate');

const messageValidators = {

	validateMessage: data => {
		let errors = {};

		if (isEmpty(data.message)) {
			errors.message = 'Must not be empty';
		}

		return {
			errors,
			valid: Object.keys(errors).length === 0 ? true : false
		};
	},

};

module.exports = messageValidators;
