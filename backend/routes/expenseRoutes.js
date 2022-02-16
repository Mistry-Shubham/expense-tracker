import express from 'express';
import {
	createNewExpense,
	getMyExpenses,
	getExpenseById,
	addExpenseToList,
	deleteExpenseFromList,
	deleteUserExpense,
	editUserExpense,
	editExpenseFromList,
} from '../controllers/expenseControllers.js';
import { loginCheck } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(loginCheck, createNewExpense);
router.route('/myexpenses').get(loginCheck, getMyExpenses);
router.route('/:id/edit').put(loginCheck, editUserExpense);
router
	.route('/:id')
	.get(loginCheck, getExpenseById)
	.put(loginCheck, addExpenseToList)
	.delete(loginCheck, deleteUserExpense);
router
	.route('/:id/:listid')
	.delete(loginCheck, deleteExpenseFromList)
	.put(loginCheck, editExpenseFromList);

export default router;
