import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
	{
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
			type: String,
			required: true,
		},
		age: {
			type: Number,
			default: 0,
		},
		defaultCurrency: {
			type: Object,
			default: { name: 'Indian Rupee', code: 'INR', symbol: '₹', id: 69 },
		},
		isVerified: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
