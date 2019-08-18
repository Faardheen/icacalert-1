import { Schema, model } from 'mongoose';
import moment from 'moment';

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
		type: String,
		default: () => moment().format('MMMM Do HH:mm')
	},
	h: {
		type: String,
		default: () => moment().format('HH')
	},
	m: {
		type: String,
		default: () => moment().format('mm')
	},
	geo: {
		type: String,
		default: 'Port-Louis',
		required: false
	},
	place: {
		type: String,
		required: false,
	}
});

export default model('Alert', AlertSchema);