import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

//@desc   	Register new user
//route     POST/api/users
//access    public
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

//@desc   	Login user
//route     POST/api/users/login
//access    public
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			dateOfBirth: user.dateOfBirth,
			age: user.age,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

//@desc   	Get user profile
//route     Get/api/users/profile
//access    private

export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			dateOfBirth: user.dateOfBirth,
			age: user.age,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});
