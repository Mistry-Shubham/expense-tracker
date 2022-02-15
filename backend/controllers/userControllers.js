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

	const birthYear = new Date(dateOfBirth).getFullYear();
	const birthMonth = new Date(dateOfBirth).getMonth() + 1;
	const birthDay = new Date(dateOfBirth).getDate();

	const todayYear = new Date().getFullYear();
	const todayMonth = new Date().getMonth() + 1;
	const todayDay = new Date().getDate();

	let calculatedAge;
	if (todayMonth > birthMonth) {
		calculatedAge = todayYear - birthYear;
	} else if (todayMonth === birthMonth) {
		if (todayDay >= birthDay) {
			calculatedAge = todayYear - birthYear;
		} else {
			calculatedAge = todayYear - birthYear - 1;
		}
	} else {
		calculatedAge = todayYear - birthYear - 1;
	}

	const user = await User.create({
		firstName,
		lastName,
		email,
		password,
		dateOfBirth,
		age: calculatedAge,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			dateOfBirth: user.dateOfBirth,
			age: user.age,
			token: generateToken(user._id),
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
//route     GET/api/users/profile
//access    private
export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		const birthYear = new Date(user.dateOfBirth).getFullYear();
		const birthMonth = new Date(user.dateOfBirth).getMonth() + 1;
		const birthDay = new Date(user.dateOfBirth).getDate();

		const todayYear = new Date().getFullYear();
		const todayMonth = new Date().getMonth() + 1;
		const todayDay = new Date().getDate();

		let calculatedAge;
		if (todayMonth > birthMonth) {
			calculatedAge = todayYear - birthYear;
		} else if (todayMonth === birthMonth) {
			if (todayDay >= birthDay) {
				calculatedAge = todayYear - birthYear;
			} else {
				calculatedAge = todayYear - birthYear - 1;
			}
		} else {
			calculatedAge = todayYear - birthYear - 1;
		}

		user.age = calculatedAge;
		await user.save();

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

//@desc   	Update user profile
//route     PUT/api/users/profile
//access    private
export const updateUserProfile = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password, dateOfBirth } = req.body;

	const user = await User.findById(req.user._id);

	const birthYear = new Date(dateOfBirth).getFullYear();
	const birthMonth = new Date(dateOfBirth).getMonth() + 1;
	const birthDay = new Date(dateOfBirth).getDate();

	const todayYear = new Date().getFullYear();
	const todayMonth = new Date().getMonth() + 1;
	const todayDay = new Date().getDate();

	let calculatedAge;
	if (todayMonth > birthMonth) {
		calculatedAge = todayYear - birthYear;
	} else if (todayMonth === birthMonth) {
		if (todayDay >= birthDay) {
			calculatedAge = todayYear - birthYear;
		} else {
			calculatedAge = todayYear - birthYear - 1;
		}
	} else {
		calculatedAge = todayYear - birthYear - 1;
	}

	if (user) {
		user.firstName = firstName;
		user.lastName = lastName;
		user.email = email;
		if (dateOfBirth) {
			user.dateOfBirth = dateOfBirth;
			user.age = calculatedAge;
		}
		if (password) {
			user.password = password;
		}

		const updatedUser = await user.save();
		res.json({
			_id: updatedUser._id,
			firstName: updatedUser.firstName,
			lastName: updatedUser.lastName,
			email: updatedUser.email,
			dateOfBirth: updatedUser.dateOfBirth,
			age: updatedUser.age,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});
