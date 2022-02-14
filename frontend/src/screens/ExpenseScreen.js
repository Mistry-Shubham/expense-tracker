import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoAddCircleSharp } from 'react-icons/io5';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getExpenseById, addExpenseToList } from '../actions/expenseActions';
import { ADD_EXPENSE_TO_LIST_RESET } from '../constants/expenseConstants';

const ExpenseScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id: expenseId } = useParams();

	const [name, setName] = useState('');
	const [amount, setAmount] = useState('');

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, expense, error } = useSelector(
		(state) => state.expenseGetById
	);

	const {
		loading: loadingAdd,
		success: successAdd,
		error: errorAdd,
	} = useSelector((state) => state.expenseAddToList);

	useEffect(() => {
		if (!userInfo) {
			navigate('/');
		}

		dispatch(getExpenseById(expenseId));
	}, [dispatch, navigate, expenseId, userInfo]);

	useEffect(() => {
		if (successAdd) {
			dispatch(getExpenseById(expenseId));
			dispatch({ type: ADD_EXPENSE_TO_LIST_RESET });
		}
	}, [successAdd, dispatch, expenseId]);

	const formSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(
			addExpenseToList({
				id: expenseId,
				expense: { name: name[0].toUpperCase() + name.substring(1), amount },
			})
		);
		setName('');
		setAmount('');
	};

	return (
		<div className="main-container">
			<div className="expense-screen">
				{loading ? (
					<Loader />
				) : error ? (
					<Message type="error">{error}</Message>
				) : (
					<>
						<h2 className="screen-title">{expense.category}</h2>
						<div className="expense-screen-grid">
							<div>
								{name[0] === ' ' ? (
									<div style={{ color: 'red' }}>
										Name cannot start with a space
									</div>
								) : null}
								<form onSubmit={formSubmitHandler}>
									{errorAdd && <Message type="error">{errorAdd}</Message>}
									<div className="add-expense-list">
										<div>
											<label htmlFor="name">Name:</label>
											<input
												required
												type="text"
												id="name"
												value={name}
												onChange={(e) => setName(e.target.value)}
											/>
										</div>
										<div>
											<label htmlFor="amount">Amount:</label>
											<input
												required
												type="number"
												id="amount"
												value={amount}
												onChange={(e) => setAmount(e.target.value)}
											/>
										</div>
										<button
											type="submit"
											className="primary-button"
											disabled={loadingAdd}
										>
											{loadingAdd ? (
												<Loader border="3px" size="30px" color="green" />
											) : (
												<>
													<IoAddCircleSharp className="margin-right" />
													Add Expense
												</>
											)}
										</button>
									</div>
								</form>
								<div className="expense-list-table">
									<table>
										<thead>
											<tr className="expense-table-row">
												<th className="expense-table-head">SR. NO.</th>
												<th className="expense-table-head">ID</th>
												<th className="expense-table-head">NAME</th>
												<th className="expense-table-head">AMOUNT</th>
												<th className="expense-table-head">{'DATE & TIME'}</th>
											</tr>
										</thead>
										<tbody>
											{expense.expenseList &&
												expense.expenseList.map((item, idx) => (
													<tr key={idx + 1} className="expense-table-row">
														<td className="expense-table-data">{idx + 1}</td>
														<td className="expense-table-data">{item._id}</td>
														<td className="expense-table-data">{item.name}</td>
														<td className="expense-table-data">
															₹{item.amount}
														</td>
														<td className="expense-table-data">
															{item.updatedAt.split('T')[0].split('-')[2]}/
															{item.updatedAt.split('T')[0].split('-')[1]}/
															{item.updatedAt.split('T')[0].split('-')[0]}
															{' - '}
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
														</td>
													</tr>
												))}
										</tbody>
									</table>
								</div>
							</div>
							<div className="expense-stats-container">
								<div className="expense-stats">
									<h3>Name:</h3>
									{userInfo.firstName} {userInfo.lastName}
								</div>
								<div className="expense-stats">
									<h3>Total:</h3> ₹{expense.maxAmount}
								</div>
								<div className="expense-stats">
									<h3>Spent:</h3> ₹{expense.totalSpent}
								</div>
								<div className="expense-stats">
									<h3>Remaining:</h3> ₹{expense.maxAmount - expense.totalSpent}
								</div>
								{expense.createdAt && (
									<div className="expense-stats">
										<h3>Created At:</h3>{' '}
										{expense.createdAt.split('T')[0].split('-')[2]}/
										{expense.createdAt.split('T')[0].split('-')[1]}/
										{expense.createdAt.split('T')[0].split('-')[0]}
										{' - '}
										{
											new Date(expense.createdAt)
												.toLocaleString('en-au')
												.split(',')[1]
												.split(':')[0]
										}
										:
										{
											new Date(expense.createdAt)
												.toLocaleString('en-au')
												.split(',')[1]
												.split(':')[1]
										}
										{` ${new Date(expense.createdAt)
											.toLocaleString('en-au')
											.split(',')[1]
											.split(':')[2]
											.split(' ')[1]
											.toUpperCase()}`}
									</div>
								)}
								{expense.updatedAt && (
									<div className="expense-stats">
										<h3>Last Updated:</h3>{' '}
										{expense.updatedAt.split('T')[0].split('-')[2]}/
										{expense.updatedAt.split('T')[0].split('-')[1]}/
										{expense.updatedAt.split('T')[0].split('-')[0]}
										{' - '}
										{
											new Date(expense.updatedAt)
												.toLocaleString('en-au')
												.split(',')[1]
												.split(':')[0]
										}
										:
										{
											new Date(expense.updatedAt)
												.toLocaleString('en-au')
												.split(',')[1]
												.split(':')[1]
										}
										{` ${new Date(expense.updatedAt)
											.toLocaleString('en-au')
											.split(',')[1]
											.split(':')[2]
											.split(' ')[1]
											.toUpperCase()}`}
									</div>
								)}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ExpenseScreen;
