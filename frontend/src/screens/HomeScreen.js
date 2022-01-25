import Expense from '../components/Expense';
import expenses from '../expenses';
import './screens-style.css';

const HomeScreen = () => {
	return (
		<div className="main-container">
			<div className="home-screen">
				<h2 className="screen-title">Expesne List</h2>
				<div className="total-info-bar">
					<div className="total-amount-alloted info-bar-containers">
						<h4 className="info-bar-title">Total Expense</h4>
						<p className="info-bar-content">
							₹{expenses.reduce((acc, currVal) => acc + currVal.maxAmount, 0)}
						</p>
					</div>
					<div className="total-amount-remaining info-bar-containers">
						<h4 className="info-bar-title">Total Remaining</h4>
						<p className="info-bar-content">
							₹
							{expenses.reduce(
								(acc, currVal) =>
									acc + (currVal.maxAmount - currVal.totalSpent),
								0
							)}
						</p>
					</div>
					<div className="total-amount-spent info-bar-containers">
						<h4 className="info-bar-title">Total Spent</h4>
						<p className="info-bar-content">
							₹{expenses.reduce((acc, currVal) => acc + currVal.totalSpent, 0)}
						</p>
					</div>
				</div>
				<div className="expenses-grid">
					{expenses.map((expense, idx) => (
						<Expense key={idx + 1} expense={expense} />
					))}
				</div>
			</div>
		</div>
	);
};

export default HomeScreen;
