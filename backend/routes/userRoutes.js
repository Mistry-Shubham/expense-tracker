import express from 'express';
import {
	registerUser,
	authUser,
	getUserProfile,
	updateUserProfile,
	verifyUser,
} from '../controllers/userControllers.js';
import { loginCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/verify/:token').get(verifyUser);
router
	.route('/profile')
	.get(loginCheck, getUserProfile)
	.put(loginCheck, updateUserProfile);

export default router;
