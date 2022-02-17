import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoAddCircleSharp, IoPencilSharp, IoTrashSharp } from 'react-icons/io5';
import { defaultAppContext } from '../Contexts';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
	getExpenseById,
	addExpenseToList,
	deleteItemFromList,
	deleteExpense,
} from '../actions/expenseActions';
import {
	ADD_EXPENSE_TO_LIST_RESET,
	DELETE_ITEM_FROM_LIST_RESET,
	DELETE_EXPENSE_RESET,
} from '../constants/expenseConstants';

const ExpenseScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id: expenseId } = useParams();

	const { defaultCurrency } = useContext(defaultAppContext);

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

	const {
		loading: loadingDeleteItem,
		success: successDeleteItem,
		error: errorDeleteItem,
	} = useSelector((state) => state.expenseDeleteItem);

	const {
		loading: loadingDeleteExpense,
		success: successDeleteExpense,
		error: errorDeleteExpense,
	} = useSelector((state) => state.expenseDelete);

	useEffect(() => {
		if (!userInfo || successDeleteExpense) {
			navigate('/');
			dispatch({ type: DELETE_EXPENSE_RESET });
		}

		dispatch(getExpenseById(expenseId));
	}, [dispatch, navigate, expenseId, userInfo, successDeleteExpense]);

	useEffect(() => {
		if (successAdd || successDeleteItem) {
			dispatch(getExpenseById(expenseId));
			dispatch({ type: ADD_EXPENSE_TO_LIST_RESET });
			dispatch({ type: DELETE_ITEM_FROM_LIST_RESET });
		}
	}, [successAdd, dispatch, expenseId, successDeleteItem]);

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

	const editExpenseHandler = () => {
		navigate(`/expense/${expenseId}/edit`);
	};

	const deleteItemHandler = (name, id) => {
		if (window.confirm(`Are you sure you want to delete ${name}`)) {
			dispatch(deleteItemFromList({ id: expenseId, listid: id }));
		}
	};

	const deleteExpenseHandler = () => {
		if (window.confirm(`Are ypu sure you want to delete ${expense.category}`)) {
			dispatch(deleteExpense(expenseId));
		}
	};

	return (
		<div className="main-container">
			<div className="expense-screen">
				{errorDeleteExpense && (
					<Message type="error">{errorDeleteExpense}</Message>
				)}
				{loading ? (
					<Loader />
				) : error ? (
					<Message type="error">{error}</Message>
				) : (
					<>
						<div className="expense-title">
							<h2 className="screen-title">{expense.category}</h2>
							<div className="title-button-container">
								<button
									type="button"
									onClick={editExpenseHandler}
									className="primary-button title-button"
								>
									<IoPencilSharp className="margin-right" />
									Edit
								</button>
								<button
									type="button"
									onClick={deleteExpenseHandler}
									className="primary-delete title-button"
								>
									{loadingDeleteExpense ? (
										<Loader border="3px" size="30px" color="green" />
									) : (
										<>
											<IoTrashSharp className="margin-right" />
											Delete
										</>
									)}
								</button>
							</div>
						</div>
						<div className="expense-screen-grid">
							<div>
								{name.includes(' ') ? (
									<div style={{ color: 'red' }}>
										Name cannot contain any space
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
											disabled={loadingAdd || name.includes(' ')}
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
								{errorDeleteItem && (
									<Message type="error">{errorDeleteItem}</Message>
								)}
								<div className="expense-list-table">
									<table>
										<thead>
											<tr className="expense-table-row">
												<th className="expense-table-head">SR. NO.</th>
												<th className="expense-table-head">NAME</th>
												<th className="expense-table-head">AMOUNT</th>
												<th className="expense-table-head">DATE</th>
												<th className="expense-table-head">TIME</th>
												<th className="expense-table-head"></th>
											</tr>
										</thead>
										<tbody>
											{expense.expenseList &&
												expense.expenseList.map((item, idx) => (
													<tr key={idx + 1} className="expense-table-row">
														<td className="expense-table-data">{idx + 1}</td>
														<td className="expense-table-data">{item.name}</td>
														<td className="expense-table-data">
															{defaultCurrency && defaultCurrency.symbol}
															{item.amount}
														</td>
														<td className="expense-table-data">
															{item.createdAt.split('T')[0].split('-')[2]}/
															{item.createdAt.split('T')[0].split('-')[1]}/
															{item.createdAt.split('T')[0].split('-')[0]}
														</td>
														<td className="expense-table-data">
															{
																new Date(item.createdAt)
																	.toLocaleString('en-au')
																	.split(',')[1]
																	.split(':')[0]
															}
															:
															{
																new Date(item.createdAt)
																	.toLocaleString('en-au')
																	.split(',')[1]
																	.split(':')[1]
															}
															{` ${new Date(item.createdAt)
																.toLocaleString('en-au')
																.split(',')[1]
																.split(':')[2]
																.split(' ')[1]
																.toUpperCase()}`}
														</td>
														<td className="expense-table-data">
															<button
																type="button"
																onClick={() =>
																	deleteItemHandler(item.name, item._id)
																}
																className="primary-delete expense-table-button"
															>
																{loadingDeleteItem ? (
																	<Loader
																		border="3px"
																		size="30px"
																		color="green"
																	/>
																) : (
																	<>
																		<IoTrashSharp className="margin-right" />
																		Delete
																	</>
																)}
															</button>
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
									{expense.user && expense.user.firstName}{' '}
									{expense.user && expense.user.lastName}
								</div>
								<div className="expense-stats">
									<h3>Total:</h3> {defaultCurrency && defaultCurrency.symbol}
									{expense.maxAmount}
								</div>
								<div className="expense-stats">
									<h3>Spent:</h3> {defaultCurrency && defaultCurrency.symbol}
									{expense.totalSpent}
								</div>
								<div className="expense-stats">
									<h3>Remaining:</h3>{' '}
									{defaultCurrency && defaultCurrency.symbol}
									{expense.maxAmount - expense.totalSpent}
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
