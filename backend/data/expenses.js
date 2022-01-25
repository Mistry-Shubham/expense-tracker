const expenses = [
	{
		category: 'Entertainment',
		maxAmount: 2000,
		totalSpent: 500,
		expenseList: [
			{ name: 'Movie', price: 200, addedAt: '2022-01-25T16:39:13.965Z' },
			{ name: 'Games', price: 200, addedAt: '2022-01-25T16:39:13.965Z' },
			{ name: 'Other', price: 100, addedAt: '2022-01-25T16:39:13.965Z' },
		],
		createdAt: new Date(),
	},
	{
		category: 'Shopping',
		maxAmount: 3000,
		totalSpent: 1200,
		expenseList: [
			{ name: 'Clothes', price: 800, addedAt: '2022-01-25T16:39:13.965Z' },
			{ name: 'Grocery', price: 400, addedAt: '2022-01-25T16:39:13.965Z' },
		],
		createdAt: new Date(),
	},
];

export default expenses;
