import express from 'express';
import {
	registerUser,
	authUser,
	getUserProfile,
} from '../controllers/userControllers.js';
import { loginCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').get(loginCheck, getUserProfile);

export default router;
