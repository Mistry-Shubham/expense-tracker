import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Expense from '../components/Expense';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listMyExpenses } from '../actions/expenseActions';
import './screens-style.css';

const HomeScreen = () => {
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, expenses, error } = useSelector(
		(state) => state.expenseMyList
	);
	useEffect(() => {
		dispatch(listMyExpenses());
	}, [dispatch]);

	return (
		<div className="main-container">
			<div className="home-screen">
				{expenses && expenses.length === 0 ? (
					<div className="welcome-homescreen-message">
						<h2 className="screen-title welcome-title">
							Hello {userInfo.firstName}, <span>Click here</span> or on the Add
							Expense button to add your first expense.
						</h2>
					</div>
				) : (
					<>
						<h2 className="screen-title">Expesne List</h2>
						{loading ? (
							<Loader />
						) : error ? (
							<Message type="error">{error}</Message>
						) : (
							<>
								<div className="total-info-bar">
									<div className="total-amount-alloted info-bar-containers">
										<h4 className="info-bar-title">Total Expense</h4>
										<p className="info-bar-content">
											₹
											{expenses.reduce(
												(acc, currVal) => acc + currVal.maxAmount,
												0
											)}
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
											₹
											{expenses.reduce(
												(acc, currVal) => acc + currVal.totalSpent,
												0
											)}
										</p>
									</div>
								</div>
								<div className="expenses-grid">
									{expenses.map((expense, idx) => (
										<Expense key={idx + 1} expense={expense} />
									))}
								</div>
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default HomeScreen;
