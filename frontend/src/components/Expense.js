import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultAppContext } from '../Contexts';
import ProgressBar from './ProgressBar';
import './components-style.css';

const Expense = ({ expense }) => {
	const navigate = useNavigate();

	const { defaultCurrency } = useContext(defaultAppContext);

	const [expand, setExpamd] = useState(false);

	const remaining = expense.maxAmount - expense.totalSpent;

	return (
		<div
			className="expense-container"
			id={remaining <= 0 ? 'expense-warn' : ''}
		>
			<div
				className="expense-heading"
				onClick={() => navigate(`/expense/${expense._id}`)}
			>
				<h3 className="category">{expense.category}</h3>
				<p className="expense-remaining">
					Remaining: {defaultCurrency && defaultCurrency.symbol}
					{remaining}
				</p>
				<p className="expense-created-at">
					{' '}
					{expense.createdAt.split('T')[0].split('-')[2]}/
					{expense.createdAt.split('T')[0].split('-')[1]}/
					{expense.createdAt.split('T')[0].split('-')[0]}
				</p>
			</div>
			<div
				className="expense-amount"
				onClick={() => navigate(`/expense/${expense._id}`)}
			>
				<ProgressBar
					id="progress-bar"
					progress={expense.totalSpent}
					max={expense.maxAmount}
				/>
				<label htmlFor="progress-bar" className="amount-label">
					{defaultCurrency && defaultCurrency.symbol}
					{expense.totalSpent}/{expense.maxAmount}
				</label>
			</div>
			{expand ? (
				<div className="expense-list">
					{expense.expenseList.map((item, idx) => (
						<div
							key={idx + 1}
							className="list-container"
							onClick={() => navigate(`/expense/${expense._id}`)}
						>
							<p>{idx + 1}</p>
							<p>{item.name}</p>
							<p>
								{defaultCurrency && defaultCurrency.symbol}
								{item.amount}
							</p>
							<p>
								{
									new Date(item.updatedAt)
										.toLocaleString('en-au')
										.split(',')[1]
										.split(':')[0]
								}
								:
								{
									new Date(item.updatedAt)
										.toLocaleString('en-au')
										.split(',')[1]
										.split(':')[1]
								}
								{` ${new Date(item.updatedAt)
									.toLocaleString('en-au')
									.split(',')[1]
									.split(':')[2]
									.split(' ')[1]
									.toUpperCase()}`}
							</p>
							<p>
								{item.updatedAt.split('T')[0].split('-')[2]}/
								{item.updatedAt.split('T')[0].split('-')[1]}/
								{item.updatedAt.split('T')[0].split('-')[0]}
							</p>
						</div>
					))}
					<p className="expand-card" onClick={() => setExpamd(false)}>
						Show Less
					</p>
				</div>
			) : (
				<p className="expand-card" onClick={() => setExpamd(true)}>
					Show More
				</p>
			)}
		</div>
	);
};

export default Expense;
