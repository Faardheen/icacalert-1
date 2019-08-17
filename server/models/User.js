import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {
		type: String,
		match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
	},
	alerts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Alert',
		},
	],
});

export default model('User', UserSchema);