const Validator = require('validator');
const isEmpty = require('is-empty');

export default data => {
	let errors = {};

	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.phone = !isEmpty(data.phone) ? data.phone : '';

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	} else if (!Validator.isEmail(data.email)) {
		errors.email = 'Email address is invalid';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}

	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}

	if (Validator.isEmpty(data.phone)) {
		errors.phone = 'Invalid phone number format. Make sure you include +230';
	}

	return { errors, isValid: isEmpty(errors) };
};