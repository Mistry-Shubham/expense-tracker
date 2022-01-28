import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	dateOfBirth: {
		type: Date,
		required: true,
	},
	age: {
		type: Number,
		default: 0,
	},
});

const User = mongoose.Model('User', userSchema);

export default User;
