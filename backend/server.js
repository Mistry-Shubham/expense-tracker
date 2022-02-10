import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.send('API is running');
});

app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () =>
	console.log(
		chalk.magentaBright.bold(
			`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
		)
	)
);
