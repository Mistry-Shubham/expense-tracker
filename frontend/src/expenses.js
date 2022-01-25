const expenses = [
	{
		category: 'Entertainment',
		maxAmount: 2000,
		totalSpent: 500,
		expenseList: [
			{ name: 'Movie', price: 200, addedAt: new Date() },
			{ name: 'Games', price: 200, addedAt: new Date() },
			{ name: 'Other', price: 100, addedAt: new Date() },
		],
		createdAt: new Date(),
	},
	{
		category: 'Shopping',
		maxAmount: 3000,
		totalSpent: 1200,
		expenseList: [
			{ name: 'Clothes', price: 800, addedAt: new Date() },
			{ name: 'Grocery', price: 400, addedAt: new Date() },
		],
		createdAt: new Date(),
	},
];

export default expenses;
