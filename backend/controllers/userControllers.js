import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

//@desc    Register new user
//route     POST/api/users
//access    private
export const registerUser = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password, dateOfBirth } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create({
		firstName,
		lastName,
		email,
		password,
		dateOfBirth,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			dateOfBirth: user.dateOfBirth,
			age: user.age,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});
