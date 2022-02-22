import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import schedule from 'node-schedule';
import chalk from 'chalk';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import sendMail from '../utils/userVerficationMail.js';

const mainUrl = 'http://localhost:5000';

//@desc   	Register new user
//route     POST/api/users
//access    public
export const registerUser = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password, dateOfBirth, currency } =
		req.body;

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
		defaultCurrency: currency,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			dateOfBirth: user.dateOfBirth,
			age: user.age,
			defaultCurrency: user.defaultCurrency,
			isVerified: user.isVerified,
			token: generateToken(user._id),
		});

		const userVeficationToken = generateToken(
			user._id,
			process.env.USER_VERFICATION_SECRET,
			'30m'
		);

		if (userVeficationToken) {
			const URL = `${mainUrl}/api/users/verify/${userVeficationToken}`;
			sendMail(
				{
					user: process.env.GMAIL_USER,
					pass: process.env.GMAIL_PASS,
					receiver: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
				},
				URL
			);
		}
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

	if (user) {
		if (!user.isVerified) {
			res.status(401);
			throw new Error(
				'Your account is not verified please check your inbox to verify your account'
			);
		} else {
			if (user && (await user.matchPassword(password))) {
				res.json({
					_id: user._id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					dateOfBirth: user.dateOfBirth,
					age: user.age,
					defaultCurrency: user.defaultCurrency,
					isVerified: user.isVerified,
					token: generateToken(user._id),
				});
			} else {
				res.status(401);
				throw new Error('Invalid email or password');
			}
		}
	} else {
		res.status(404);
		throw new Error(
			'Account does not exist register again to verify your email or Login again with correct credentials '
		);
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
			defaultCurrency: user.defaultCurrency,
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
	const { firstName, lastName, email, password, currency, dateOfBirth } =
		req.body;

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
		if (firstName) {
			user.firstName = firstName;
		}
		if (lastName) {
			user.lastName = lastName;
		}
		if (email) {
			user.email = email;
		}
		if (currency) {
			user.defaultCurrency = currency;
		}
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
			defaultCurrency: updatedUser.defaultCurrency,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

//@desc     Verfiy Refistered Users
//route     GET/api/users/verify/:token
//access    public
export const verifyUser = asyncHandler(async (req, res) => {
	const token = req.params.token;
	if (token) {
		const decoded = jwt.verify(token, process.env.USER_VERFICATION_SECRET);
		if (decoded.id) {
			const user = await User.findById(decoded.id);
			if (user) {
				user.isVerified = true;

				const verifiedUser = await user.save();

				if (verifiedUser) {
					res
						.status(201)
						.send(`${verifiedUser.firstName} your account is verfied`);
				}
			} else {
				res.status(401).send('Token expired signup again');
				throw new Error('Token expired signup again');
			}
		} else {
			res.status(401).send('Token invalid or expired');
			throw new Error('Token invalid or expired');
		}
	} else {
		res.status(404).send('Token not found');
		throw new Error('Token not found');
	}
});

//@desc     Verify User Email
//route     POST or GET or PUT/api/users/password-reset/:step
//access    public
export const userPasswordReset = asyncHandler(async (req, res) => {
	const { step, token } = req.params;

	if (step === 'step1') {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			res.status(200).json({
				email: user.email,
				resetId: user._id,
			});

			const passwordResetToken = generateToken(
				user._id,
				process.env.USER_VERFICATION_SECRET,
				'10m'
			);

			if (passwordResetToken) {
				const URL = `${mainUrl}/api/users/password-reset/step2/${passwordResetToken}`;
				sendMail(
					{
						user: process.env.GMAIL_USER,
						pass: process.env.GMAIL_PASS,
						receiver: user.email,
						firstName: user.firstName,
						lastName: user.lastName,
						purpose: 'password-reset',
					},
					URL
				);
			}
		} else {
			res.status(404);
			throw new Error('User not Found');
		}
	} else if (step === 'step2') {
		if (token) {
			const decoded = jwt.verify(token, process.env.USER_VERFICATION_SECRET);
			if (decoded.id) {
				const user = await User.findOneAndUpdate(
					{ _id: decoded.id },
					{ passwordReset: true },
					{ new: true }
				);
				if (user) {
					res
						.status(200)
						.send('Account verified go back and reset your password');
				} else {
					res.status(404);
					throw new Error('User not found');
				}
			} else {
				res.status(401).send('Token invalid or expired try again');
			}
		}
	} else if (step === 'step3') {
		const { resetId, password } = req.body;
		if (resetId && password) {
			const user = await User.findById(resetId);
			if (user) {
				if (user.passwordReset) {
					if (password) {
						user.password = password;
						user.passwordReset = false;

						await user.save();
						res.status(200).json({ message: 'Password Reset Successful' });
					} else {
						res.status(400);
						throw new Error('Check paassword and try again');
					}
				} else {
					res.status(401);
					throw new Error('Verify your email before reseting password');
				}
			} else {
				res.status(404);
				throw new Error('User not found');
			}
		} else {
			res.status(400);
			throw new Error('Invalid data');
		}
	}
});

// Scheduled Jobs
const job = schedule.scheduleJob('* * * * *', () => {
	deleteUnrecognizedUsers();
	changePasswordResetStatus();
});

// Delete user if not verified email within 30 minutes of registration
const deleteUnrecognizedUsers = () => {
	const currentDate = new Date();
	currentDate.setMinutes(currentDate.getMinutes() - 30);

	User.deleteMany({ isVerified: false, createdAt: { $lte: currentDate } })
		.then((result) => {
			if (result.deletedCount > 0) {
				console.log(
					chalk.yellowBright(
						`Deleted ${result.deletedCount} Unrecognized Users`
					)
				);
			}
		})
		.catch((err) =>
			console.error(
				chalk.redBright(`Error while deleting Unrecognized Users ${err}`)
			)
		);
};

// Change user passwordReset status to false
const changePasswordResetStatus = async () => {
	const currentDate = new Date();
	currentDate.setMinutes(currentDate.getMinutes() - 10);

	const user = await User.findOne({
		passwordReset: true,
		updatedAt: { $lte: currentDate },
	});

	if (user) {
		user.passwordReset = false;
		await user.save();
		console.log(chalk.greenBright('Changed 1 user passwordReset status'));
	}
};
