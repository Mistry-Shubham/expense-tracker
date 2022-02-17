import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoAddSharp, IoAddCircleSharp } from 'react-icons/io5';
import { FiExternalLink } from 'react-icons/fi';
import { defaultAppContext } from '../Contexts';
import Expense from '../components/Expense';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listMyExpenses, createNewExpense } from '../actions/expenseActions';
import { CREATE_NEW_EXPENSE_RESET } from '../constants/expenseConstants';
import './screens-style.css';

const HomeScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { addExpenseSection, setAddExpenseSection, defaultCurrency } =
		useContext(defaultAppContext);

	const [category, setCategory] = useState('');
	const [maxAmount, setMaxAmount] = useState('');

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, expenses, error } = useSelector(
		(state) => state.expenseMyList
	);

	const {
		loading: loadingCreate,
		success: successCreate,
		expense: expenseCreate,
		error: errorCreate,
	} = useSelector((state) => state.expenseCreateNew);

	useEffect(() => {
		if (successCreate) {
			navigate(`/expense/${expenseCreate._id}`);
			dispatch({ type: CREATE_NEW_EXPENSE_RESET });
		}
		dispatch(listMyExpenses());
	}, [dispatch, successCreate]);

	const toggleAddExpense = () => setAddExpenseSection(!addExpenseSection);

	const createExpenseHandler = (e) => {
		e.preventDefault();
		dispatch(
			createNewExpense({
				category: category && category[0].toUpperCase() + category.substring(1),
				maxAmount,
			})
		);
		setAddExpenseSection(false);
	};

	return (
		<div className="main-container">
			<div className="home-screen">
				{addExpenseSection ? (
					<FormContainer handler={createExpenseHandler}>
						{errorCreate && <Message type="error">{errorCreate}</Message>}
						<label htmlFor="category" className="form-label">
							Category:
						</label>
						<input
							required
							type="text"
							id="category"
							className="form-input"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							placeholder="Enter Category Name"
						/>
						{category.includes(' ') ? (
							<div style={{ color: 'red' }}>
								Category cannot contain any space
							</div>
						) : null}
						{category.match(/^\d/) ? (
							<div style={{ color: 'red' }}>
								Category cannot start with number
							</div>
						) : null}

						<span className="spacer"></span>

						<label htmlFor="maxAmount" className="form-label">
							Max Amount:
						</label>
						<input
							required
							type="number"
							id="maxAmount"
							className="form-input"
							value={maxAmount}
							onChange={(e) => setMaxAmount(e.target.value)}
							placeholder="Enter Max Amount"
						/>

						<span className="spacer"></span>
						<span className="spacer"></span>

						<button
							type="submit"
							className="primary-button expense-create-button"
							disabled={
								loadingCreate || category.includes(' ') || category.match(/^\d/)
							}
						>
							{loadingCreate ? (
								<Loader border="3px" size="30px" color="green" />
							) : (
								<>
									<IoAddCircleSharp className="margin-right" />
									Create Expense
								</>
							)}
						</button>
					</FormContainer>
				) : !userInfo ? (
					<div className="homescreen-get-started">
						<h2 className="screen-title">
							Hello User{' '}
							<Link to="/login" className="remove-link-underline">
								Login
								<FiExternalLink />
							</Link>{' '}
							/{' '}
							<Link to="/register" className="remove-link-underline">
								Create new account
								<FiExternalLink />
							</Link>{' '}
							to get started
						</h2>
					</div>
				) : expenses && expenses.length === 0 ? (
					<div className="welcome-homescreen-message">
						<h2 className="screen-title welcome-title">
							Hello {userInfo.firstName},{' '}
							<span onClick={toggleAddExpense}>Click here</span> or on the Add
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
											{defaultCurrency && defaultCurrency.symbol}
											{expenses.reduce(
												(acc, currVal) => acc + currVal.maxAmount,
												0
											)}
										</p>
									</div>
									<div className="total-amount-remaining info-bar-containers">
										<h4 className="info-bar-title">Total Remaining</h4>
										<p className="info-bar-content">
											{defaultCurrency && defaultCurrency.symbol}
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
											{defaultCurrency && defaultCurrency.symbol}
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
				{userInfo && (
					<div onClick={toggleAddExpense} className="sticky-add-expense">
						<IoAddSharp />
					</div>
				)}
			</div>
		</div>
	);
};

export default HomeScreen;
