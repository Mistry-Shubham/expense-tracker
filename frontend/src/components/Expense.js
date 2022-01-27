import ProgressBar from './ProgressBar';

const Expense = ({ expense }) => {
	const remaining = expense.maxAmount - expense.totalSpent;
	return (
		<div className="expense-container" id={remaining < 0 ? 'expense-warn' : ''}>
			<div className="expense-heading">
				<h3 className="category">{expense.category}</h3>
				<p className="expense-remaining">Remaining: ₹{remaining}</p>
			</div>
			<div className="expense-amount">
				<ProgressBar
					id="progress-bar"
					progress={expense.totalSpent}
					max={expense.maxAmount}
				/>
				<label htmlFor="progress-bar" className="amount-label">
					₹{expense.totalSpent}/{expense.maxAmount}
				</label>
			</div>
			<div className="expense-list">
				{expense.expenseList.map((item, idx) => (
					<div key={idx + 1} className="list-container">
						<p>{idx + 1}</p>
						<p>{item.name}</p>
						<p>{`₹${item.price}`}</p>
						<p>
							{item.addedAt.substring(12).split(':')[0]}:
							{item.addedAt.substring(12).split(':')[1]}
							{` ${item.addedAt.substring(12).split(' ')[1].toUpperCase()}`}
						</p>
						<p>{item.addedAt.substring(0, 10)}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Expense;