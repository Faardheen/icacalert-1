export default data => {
	let errors = {};
	let isValid = true;
	const { email, password, phone } = data;

	let x = email.split('@')
	let y = email.split('.')

	if (!email) {
		errors.email = 'Enter your email address';
		isValid = false;
	} else {
		if (x.length > 2 || y.length > 2 || x.length == 1) {
			errors.email = 'Invalid email address';
			isValid = false;
		}
	}

	if (!password) {
		errors.password = 'Enter a password';
		isValid = false;
	} else {
		if (password.length < 3) {
			errors.password = 'Password should contain at least 3 characters';
			isValid = false;
		}
	}

	if (!phone) {
		errors.email = 'Enter your phone number';
		isValid = false;
	} else {
		if (phone.length != 8 || phone.substring(0, 1) != "5") {
			errors.phone = 'Invalid phone number';
			isValid = false;
		}
	}

	return { errors, isValid };
};