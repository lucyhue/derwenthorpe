const { sanitise } = require('../util/sanitise');
const { isEmail, isEmpty } = require('../util/validate');

const userValidators = {
	sanitiseSignupData: (req) => {
		return {
			firstName: sanitise(req, 'firstName'),
			lastName: sanitise(req, 'lastName'),
			uniqueName: sanitise(req, 'uniqueName'),
			emailAddress: sanitise(req, 'emailAddress'),
			password: sanitise(req, 'password'),
		};
	},

	validateSignupData: (data) => {
		let errors = {};
		const {
			firstName,
			lastName,
			uniqueName,
			emailAddress,
			password,
		} = data;

		if (isEmpty(firstName)) errors.firstName = 'Must not be empty';
		if (isEmpty(lastName)) errors.lastName = 'Must not be empty';
		if (isEmpty(uniqueName)) errors.uniqueName = 'Must not be empty';
		if (isEmpty(emailAddress)) {
			errors.email = 'Must not be empty';
		} else if (!isEmail(emailAddress)) {
			errors.email = 'Must be a valid email address';
		}

		if (isEmpty(password)) errors.password = 'Must not be empty';

		return {
			errors,
			valid: Object.keys(errors).length === 0 ? true : false
		};
	},

	sanitiseSigninData: (req) => {
		return {
			emailAddress: sanitise(req, 'emailAddress'),
			password: sanitise(req, 'password'),
		};
	},

	validateSigninData: (data) => {
		let errors = {};
		const {
			emailAddress,
			password,
		} = data;

		if (isEmpty(emailAddress)) errors.emailAddress = 'Must not be empty';
		if (isEmpty(password)) errors.password = 'Must not be empty';

		return {
			errors,
			valid: Object.keys(errors).length === 0 ? true : false
		};
	},

	sanitiseResetPasswordData: (req) => {
		return {
			emailAddress: sanitise(req, 'emailAddress'),
		};
	},

	validateResetPasswordData: (data) => {
		let errors = {};
		const {
			emailAddress,
		} = data;

		if (isEmpty(emailAddress)) errors.emailAddress = 'Must not be empty';

		return {
			errors,
			valid: Object.keys(errors).length === 0 ? true : false
		};
	},

	sanitiseUserDetails: (req) => {
		return {
			bio: sanitise(req, 'bio'),
			firstName: sanitise(req, 'firstName'),
			lastName: sanitise(req, 'lastName'),
			avatarUrl: sanitise(req, 'avatarUrl'),
			location: sanitise(req, 'location'),
			emailAddress: sanitise(req, 'emailAddress'),
		};
	}
};

module.exports = { userValidators };
