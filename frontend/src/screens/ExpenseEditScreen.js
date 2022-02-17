import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoPencilSharp, IoCloseSharp, IoSettingsSharp } from 'react-icons/io5';
import { defaultAppContext } from '../Contexts';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
	getExpenseById,
	editExpenseListItem,
	editExpense,
} from '../actions/expenseActions';
import {
	EDIT_EXPENSE_RESET,
	EDIT_LIST_ITEM_RESET,
} from '../constants/expenseConstants';

const ExpenseEditScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id: expenseId } = useParams();

	const { defaultCurrency } = useContext(defaultAppContext);

	const [category, setCategory] = useState('');
	const [maxAmount, setMaxAmount] = useState('');
	const [editListItem, setEditListItem] = useState({
		editItem: '',
		status: false,
	});
	const [name, setName] = useState('');
	const [amount, setAmount] = useState('');

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, expense, error } = useSelector(
		(state) => state.expenseGetById
	);

	const {
		loading: loadingList,
		success: successList,
		error: errorList,
	} = useSelector((state) => state.expenseEditListItem);

	const {
		loading: loadingExpense,
		success: successExpense,
		error: errorExpense,
	} = useSelector((state) => state.expenseEdit);

	useEffect(() => {
		if (successList || successExpense) {
			dispatch(getExpenseById(expenseId));
			dispatch({ type: EDIT_LIST_ITEM_RESET });
			dispatch({ type: EDIT_EXPENSE_RESET });
		}
	}, [dispatch, expenseId, successList, successExpense]);

	useEffect(() => {
		if (!userInfo) {
			navigate('/');
		}

		dispatch(getExpenseById(expenseId));
	}, [navigate, userInfo, dispatch, expenseId]);

	const toggleOnListEditHandler = (item) => {
		setEditListItem({
			editItem: item,
			status: true,
		});
		setName('');
		setAmount('');
	};

	const toggleOffListEditHandler = () => {
		setEditListItem({
			editItem: '',
			status: false,
		});
	};

	const updateListHnadler = () => {
		dispatch(
			editExpenseListItem({
				idData: { id: expenseId, listid: editListItem.editItem._id },
				newData: { name, amount },
			})
		);
		setEditListItem({
			editItem: '',
			status: false,
		});
	};

	const UpdateExpenseHandler = (e) => {
		e.preventDefault();
		dispatch(editExpense({ id: expenseId, newData: { category, maxAmount } }));
		setCategory('');
		setMaxAmount('');
	};

	return (
		<div className="main-container">
			<div className="expense-edit-screen">
				{loading ? (
					<Loader />
				) : error ? (
					<Message type="error">{error}</Message>
				) : (
					expense.user && (
						<>
							<h2 className="screen-title">{expense.category}</h2>
							<div className="expense-edit-grid">
								<div className="expense-edit-table">
									{errorList && <Message type="error">{errorList}</Message>}
									<table className="expense-edit-table">
										<thead>
											{editListItem.status ? (
												<tr className="expense-table-row">
													<th className="expense-table-head">NAME</th>
													<th className="expense-table-head">AMOUNT</th>
													<th className="expense-table-head"></th>
												</tr>
											) : (
												<tr className="expense-table-row">
													<th className="expense-table-head">SR. NO.</th>
													<th className="expense-table-head">ID</th>
													<th className="expense-table-head">NAME</th>
													<th className="expense-table-head">AMOUNT</th>
													<th className="expense-table-head"></th>
												</tr>
											)}
										</thead>
										<tbody>
											{editListItem.status ? (
												<tr className="expense-table-row">
													<td className="expense-table-data">
														<input
															type="text"
															value={name}
															onChange={(e) => setName(e.target.value)}
															placeholder={editListItem.editItem.name}
															className="edit-list-input"
														/>
													</td>
													<td className="expense-table-data">
														<input
															type="number"
															value={amount}
															onChange={(e) => setAmount(e.target.value)}
															placeholder={editListItem.editItem.amount}
															className="edit-list-input"
														/>
													</td>

													<td className="expense-table-data">
														<div className="expense-edit-button-container">
															<button
																type="button"
																onClick={updateListHnadler}
																className="primary-button expense-edit-button"
																disabled={!(name || amount)}
															>
																{loadingList ? (
																	<Loader
																		border="3px"
																		size="30px"
																		color="green"
																	/>
																) : (
																	<>
																		<IoSettingsSharp className="margin-right" />
																		Update
																	</>
																)}
															</button>
															<button
																type="button"
																onClick={toggleOffListEditHandler}
																className="primary-delete expense-edit-button"
															>
																<IoCloseSharp className="margin-right" />
																Cancel
															</button>
														</div>
													</td>
												</tr>
											) : (
												expense.expenseList.map((item, idx) => (
													<tr key={idx + 1} className="expense-table-row">
														<td className="expense-table-data">{idx + 1}</td>
														<td className="expense-table-data">{item._id}</td>
														<td className="expense-table-data">{item.name}</td>
														<td className="expense-table-data">
															{defaultCurrency && defaultCurrency.symbol}
															{item.amount}
														</td>
														<td className="expense-table-data">
															<button
																type="button"
																onClick={() => toggleOnListEditHandler(item)}
																className="primary-button expense-edit-button"
															>
																<IoPencilSharp className="margin-right" />
																Edit
															</button>
														</td>
													</tr>
												))
											)}
										</tbody>
									</table>
								</div>
								<FormContainer handler={UpdateExpenseHandler}>
									{errorExpense && (
										<Message type="error">{errorExpense}</Message>
									)}
									<label htmlFor="category" className="form-label">
										Category:
									</label>
									<input
										type="text"
										id="category"
										value={category}
										onChange={(e) => setCategory(e.target.value)}
										placeholder={expense.category}
										className="form-input"
									/>

									<span className="spacer"></span>

									<label htmlFor="maxAmount" className="form-label">
										Max Amount:
									</label>
									<input
										type="number"
										id="maxAmount"
										value={maxAmount}
										onChange={(e) => setMaxAmount(e.target.value)}
										placeholder={expense.maxAmount}
										className="form-input"
									/>

									<span className="spacer"></span>
									<span className="spacer"></span>

									<button
										type="submit"
										className="primary-button expense-update-button"
										disabled={!(category || maxAmount)}
									>
										{loadingExpense ? (
											<Loader border="3px" size="30px" color="green" />
										) : (
											<>
												<IoSettingsSharp className="margin-right" />
												Update
											</>
										)}
									</button>
								</FormContainer>
							</div>
						</>
					)
				)}
			</div>
		</div>
	);
};

export default ExpenseEditScreen;
