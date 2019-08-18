import bcrypt from 'bcrypt';
import User from '../models/User.js';
import validateRegisterInput from '../utils/validateRegisterInput.js';
import { USER_EXISTS, VAL_ERR, INV_NO, REG_ERR } from '../constants.js';
import { showErr } from '../utils/showErr.js';
import { tryLogin } from '../utils/auth.js';

export default {
	Mutation: {
		register: async (_, args) => {
			const { email, phone, password } = args;
			const hashedPassword = await bcrypt.hash(password, 12);
			const currentUser = await User.findOne({ email });
			const { errors, isValid } = await validateRegisterInput(args);
			if (!isValid) {
				console.log(errors.email)
				if (errors.password) {
					return showErr(false, 'password', errors.password)
				}
				if (errors.email) {
					return showErr(false, 'email', errors.email)
				}
				if (errors.phone) {
					return showErr(false, 'phone', errors.phone)
				}
			}
			if (currentUser) {
				return showErr(false, 'register', USER_EXISTS);
			}
			try {
				const user = await new User({
					email,
					phone,
					password: hashedPassword,
				}).save();

				return { ok: true, user };
			} catch (err) {
				return showErr(false, 'register', REG_ERR);
			}
		},
		login: (_, { email, password }, { SECRET, SECRET2 }) => {
			return tryLogin(email, password, User, SECRET, SECRET2);
		},
	},
};
