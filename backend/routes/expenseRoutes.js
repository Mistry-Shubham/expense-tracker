import express from 'express';
import {
	createNewExpense,
	getMyExpenses,
	getExpenseById,
	addExpenseToList,
} from '../controllers/expenseControllers.js';
import { loginCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(loginCheck, createNewExpense);
router.route('/myexpenses').get(loginCheck, getMyExpenses);
router
	.route('/:id')
	.get(loginCheck, getExpenseById)
	.put(loginCheck, addExpenseToList);

export default router;
