import { Schema, model } from 'mongoose';

const AlertSchema = new Schema({
	type: {
		type: String,
		required: true,
		default: '',
	},
	description: {
		type: String,
		required: false,
		default: 'no description provided',
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	lat: {
		type: Number,
		default: 0
	},
	long: {
		type: Number,
		default: 0
	},
	timeStamp: {
		type: Date,
		default: new Date().getTime()
	},
	geo: {
		type: String,
		default: 'Port-Louis',
		required: false
	}
});

export default model('Alert', AlertSchema);