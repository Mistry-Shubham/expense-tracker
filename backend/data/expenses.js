const date = new Date().toLocaleString('en-au', { timeZone: 'Asia/Kolkata' });

const expenses = [
	{
		category: 'Entertainment',
		maxAmount: 2000,
		totalSpent: 500,
		expenseList: [
			{ name: 'Movie', amount: 200, updatedAt: date },
			{ name: 'Games', amount: 200, updatedAt: date },
			{ name: 'Other', amount: 100, updatedAt: date },
		],
		createdAt: date,
	},
	{
		category: 'Shopping',
		maxAmount: 3000,
		totalSpent: 1200,
		expenseList: [
			{ name: 'Clothes', amount: 800, updatedAt: date },
			{ name: 'Grocery', amount: 400, updatedAt: date },
		],
		createdAt: date,
	},
];

export default expenses;
