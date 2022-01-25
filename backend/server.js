import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import expenses from './data/expenses.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
	res.send('API is running');
});

app.get('/api/expenses', (req, res) => {
	res.json(expenses);
});

const PORT = process.env.PORT;

app.listen(PORT, () =>
	console.log(
		chalk.magentaBright.bold(
			`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
		)
	)
);
