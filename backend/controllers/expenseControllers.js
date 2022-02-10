import asyncHandler from 'express-async-handler';
import Expense from '../models/expenseModel.js';

//@desc   	Add new expense
//route     POST/api/expenses
//access    private
export const createNewExpense = asyncHandler(async (req, res) => {
	const { category, maxAmount } = req.body;

	const expense = new Expense({
		user: req.user._id,
		category,
		maxAmount,
		totalSpent: 0,
	});

	const createdExpense = await expense.save();

	res.status(201).json(createdExpense);
});

//@desc   	Get user expenses
//route     GET/api/expenses/myexpenses
//access    private
export const getMyExpenses = asyncHandler(async (req, res) => {
	const expenses = await Expense.find({ user: req.user._id });
	expenses.map((expense) => {
		if (expense.expenseList.length > 0) {
			expense.totalSpent = expense.expenseList.reduce(
				(acc, currVal) => acc + currVal.amount,
				0
			);
		}
	});
	res.json(expenses);
});

// @desc   	 Get user expenses by ID
// route     GET/api/expenses/:id
// access    private
export const getExpenseById = asyncHandler(async (req, res) => {
	const expense = await Expense.findById(req.params.id).populate(
		'user',
		'firstName lastName'
	);
	if (expense.user._id.toString() === req.user._id.toString()) {
		if (expense.expenseList.length > 0) {
			expense.totalSpent = expense.expenseList.reduce(
				(acc, currVal) => acc + currVal.amount,
				0
			);
		}
		res.json(expense);
	}
});

// @desc   	 Add expenses to List
// route     PUT/api/expenses/:id
// access    private
export const addExpenseToList = asyncHandler(async (req, res) => {
	const { name, amount } = req.body;

	const expense = await Expense.findById(req.params.id);

	const item = {
		name,
		amount,
	};

	expense.expenseList.push(item);
	expense.totalSpent = expense.expenseList.reduce(
		(acc, currVal) => acc + currVal.amount,
		0
	);

	const addedExpense = await expense.save();

	res.json(addedExpense);
});
