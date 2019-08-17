import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const createTokens = async (user, secret, secret2) => {
	const createToken = jwt.sign(
		{
			user: _.pick(user, ['id', 'email']),
		},
		secret,
		{
			expiresIn: '7d',
		},
	);

	const createRefreshToken = jwt.sign(
		{
			user: _.pick(user, 'id'),
		},
		secret2,
		{
			expiresIn: '7d',
		},
	);

	return [createToken, createRefreshToken];
};

export const refreshTokens = async (token, refreshToken, SECRET, SECRET2) => {
	let userId = 0;
	try {
		const {
			user: { id },
		} = jwt.decode(refreshToken);
		userId = id;
	} catch (err) {
		return {};
	}

	if (!userId) {
		return {};
	}

	const user = await User.findOne({ id: userId });

	if (!user) {
		return {};
	}

	const refreshSecret = user.password + SECRET2;

	try {
		jwt.verify(refreshToken, refreshSecret);
	} catch (err) {
		return {};
	}

	const [newToken, newRefreshToken] = await createTokens(
		user,
		SECRET,
		refreshSecret,
	);
	return {
		token: newToken,
		refreshToken: newRefreshToken,
		user,
	};
};

export const tryLogin = async (email, password, model, SECRET, SECRET2) => {
	const user = await model.findOne({ email });
	if (!user) {
		return {
			ok: false,
			errors: { path: 'email', message: 'Wrong email' },
		};
	}

	const valid = await bcrypt.compare(password, user.password);

	if (!valid) {
		return {
			ok: false,
			errors: { path: 'password', message: 'Wrong password' },
		};
	}

	const refreshTokenSecret = user.password + SECRET2;

	const [token, refreshToken] = await createTokens(
		user,
		SECRET,
		refreshTokenSecret,
	);

	return { ok: true, user, token, refreshToken };
};