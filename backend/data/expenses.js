const date = new Date().toLocaleString('en-au', { timeZone: 'Asia/Kolkata' });

const expenses = [
	{
		category: 'Entertainment',
		maxAmount: 2000,
		totalSpent: 500,
		expenseList: [
			{ name: 'Movie', price: 200, addedAt: date },
			{ name: 'Games', price: 200, addedAt: date },
			{ name: 'Other', price: 100, addedAt: date },
		],
		createdAt: date,
	},
	{
		category: 'Shopping',
		maxAmount: 3000,
		totalSpent: 1200,
		expenseList: [
			{ name: 'Clothes', price: 800, addedAt: date },
			{ name: 'Grocery', price: 400, addedAt: date },
		],
		createdAt: date,
	},
];

export default expenses;
