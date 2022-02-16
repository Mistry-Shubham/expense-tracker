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
		expense.totalSpent = expense.expenseList.reduce(
			(acc, currVal) => acc + currVal.amount,
			0
		);
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
		expense.totalSpent = expense.expenseList.reduce(
			(acc, currVal) => acc + currVal.amount,
			0
		);

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

//@desc     Delete Expense From List
//route     DELETE/api/expenses/:id/:listid
//access    private
export const deleteExpenseFromList = asyncHandler(async (req, res) => {
	const { id, listid } = req.params;

	const expense = await Expense.findById(id);

	if (expense.user._id.toString() === req.user._id.toString()) {
		const checkitem = expense.expenseList.find(
			(item) => item._id.toString() === listid.toString()
		);
		if (checkitem) {
			const item = expense.expenseList.filter(
				(item) => item._id.toString() !== listid.toString()
			);

			expense.expenseList = item;

			const deleteExpenseList = await expense.save();

			res.json(deleteExpenseList);
		} else {
			res.status(401);
			throw new Error('Item already deleted or does not exist ');
		}
	} else {
		res.status(404);
		throw new Error('Expense not found');
	}
});

//@desc     Delete User Expense
//route     DELETE/api/expenses/:id
//access    private
export const deleteUserExpense = asyncHandler(async (req, res) => {
	const userCheck = await Expense.findById(req.params.id);
	if (userCheck) {
		if (userCheck.user.toString() === req.user._id.toString()) {
			const expense = await Expense.deleteOne({ _id: req.params.id });
			if (expense.deletedCount !== 0) {
				res.json(expense);
			} else {
				res.status(401);
				throw new Error('Expense already deleted or does not exist');
			}
		} else {
			res.status(404);
			throw new Error('Expense not found');
		}
	} else {
		res.status(401);
		throw new Error('Expense already deleted or does not exist');
	}
});

//@desc     Edit Expense From List
//route     PUT/api/expenses/:id/:listid
//access    private
export const editExpenseFromList = asyncHandler(async (req, res) => {
	const { id, listid } = req.params;
	const { name, amount } = req.body;

	const expense = await Expense.findById(id);

	if (expense.user._id.toString() === req.user._id.toString()) {
		const checkitem = expense.expenseList.find(
			(item) => item._id.toString() === listid.toString()
		);

		if (checkitem) {
			if (name) {
				checkitem.name = name;
			}
			if (amount) {
				checkitem.amount = amount;
			}
			await expense.save();
			res.json(checkitem);
		} else {
			res.status(401);
			throw new Error('Item already deleted or does not Exist');
		}
	} else {
		res.status(404);
		throw new Error('Expense Not Found');
	}
});

//@desc     Edit User Expense
//route     PUT/api/expenses/:id/edit
//access    private
export const editUserExpense = asyncHandler(async (req, res) => {
	const { category, maxAmount } = req.body;

	const expense = await Expense.findById(req.params.id);

	if (expense.user._id.toString() === req.user._id.toString()) {
		if (category) {
			expense.category = category;
		}
		if (maxAmount) {
			expense.maxAmount = maxAmount;
		}

		const updatedExpense = await expense.save();

		if (updatedExpense) {
			res.json(updatedExpense);
		} else {
			res.status(404);
			throw new Error('Invalid data');
		}
	} else {
		res.status(404);
		throw new Error('Expense Not Found');
	}
});
