import mongoose from 'mongoose';

const expenseListSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{ timestamps: true }
);

const expenseSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		expenseCategory: [
			{
				category: {
					type: String,
					required: true,
				},
				maxAmount: {
					type: Number,
					required: true,
					default: 0,
				},
				totalSpent: {
					type: Number,
					required: true,
					default: 0,
				},
				expenseList: [expenseListSchema],
			},
		],
	},
	{ timestamps: true }
);

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
