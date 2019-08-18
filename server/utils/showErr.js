exports.showErr = (ok, path, message) => {
	return {
		ok: ok,
		errors: { path: path, message: message }
	};
};