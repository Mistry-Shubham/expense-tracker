import jwt from 'jsonwebtoken';

const generateToken = (id, secret = process.env.JWT_SECRET, expiry = '30d') => {
	return jwt.sign({ id }, secret, {
		expiresIn: expiry,
	});
};

export default generateToken;
