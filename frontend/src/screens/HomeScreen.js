import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	IoAddSharp,
	IoAddCircleSharp,
	IoFilterSharp,
	IoCheckmarkSharp,
	IoCloseSharp,
	IoSearchSharp,
} from 'react-icons/io5';
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
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('');
	const [toggleFilter, setToggleFilter] = useState(false);
	const [filteredExpenses, setFilteredExpenses] = useState([]);
	const [renderExpenses, setRenderExpenses] = useState([]);

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
		const sortBy = {
			timeAsce() {
				setFilteredExpenses(
					expenses.sort((a, b) =>
						a.createdAt > b.createdAt
							? 1
							: a.createdAt < b.createdAt
							? -1
							: a.category.localeCompare(b.category)
					)
				);
			},
			categoryAsce() {
				setFilteredExpenses(
					expenses.sort((a, b) =>
						a.category > b.category ? 1 : a.category < b.category ? -1 : 0
					)
				);
			},
			maxAmountAsce() {
				setFilteredExpenses(
					expenses.sort((a, b) =>
						a.maxAmount > b.maxAmount
							? 1
							: a.maxAmount < b.maxAmount
							? -1
							: a.category.localeCompare(b.category)
					)
				);
			},
			totalSpentAsce() {
				setFilteredExpenses(
					expenses.sort((a, b) =>
						a.totalSpent > b.totalSpent
							? 1
							: a.totalSpent < b.totalSpent
							? -1
							: a.category.localeCompare(b.category)
					)
				);
			},
			remainingAsce() {
				setFilteredExpenses(
					expenses.sort((a, b) =>
						a.maxAmount - a.totalSpent > b.maxAmount - b.totalSpent
							? 1
							: a.maxAmount - a.totalSpent < b.maxAmount - b.totalSpent
							? -1
							: a.category.localeCompare(b.category)
					)
				);
			},
			expenseListAsce() {
				setFilteredExpenses(
					expenses.sort((a, b) =>
						a.expenseList.length > b.expenseList.length
							? 1
							: a.expenseList.length < b.expenseList.length
							? -1
							: a.category.localeCompare(b.category)
					)
				);
			},

			timeDesc() {
				setFilteredExpenses(
					expenses.sort((a, b) =>
						a.createdAt > b.createdAt
							? -1
							: a.createdAt < b.createdAt
							? 1
							: b.category.localeCompare(a.category)
					)
				);
			},
			categoryDesc() {
				setFilteredExpenses(
					expenses.sort((a, b) =>
						a.category > b.category ? -1 : a.category < b.category ? 1 : 0
					)
				);
			},
			maxAmountDesc() {
				setFilteredExpenses(
					expenses.sort((a, b) =>
						a.maxAmount > b.maxAmount
							? -1
							: a.maxAmount < b.maxAmount
							? 1
							: b.category.localeCompare(a.category)
					)
				);
			},
			totalSpentDesc() {
				setFilteredExpenses(
					expenses.sort((a, b) =>
						a.totalSpent > b.totalSpent
							? -1
							: a.totalSpent < b.totalSpent
							? 1
							: b.category.localeCompare(a.category)
					)
				);
			},
			remainingDesc() {
				setFilteredExpenses(
					expenses.sort((a, b) =>
						a.maxAmount - a.totalSpent > b.maxAmount - b.totalSpent
							? -1
							: a.maxAmount - a.totalSpent < b.maxAmount - b.totalSpent
							? 1
							: b.category.localeCompare(a.category)
					)
				);
			},
			expenseListDesc() {
				setFilteredExpenses(
					expenses.sort((a, b) =>
						a.expenseList.length > b.expenseList.length
							? -1
							: a.expenseList.length < b.expenseList.length
							? 1
							: b.category.localeCompare(a.category)
					)
				);
			},
		};
		if (expenses) {
			if (filter === 'timeAsce') {
				sortBy.timeAsce();
			} else if (filter === 'categoryAsce') {
				sortBy.categoryAsce();
			} else if (filter === 'maxAmountAsce') {
				sortBy.maxAmountAsce();
			} else if (filter === 'totalSpentAsce') {
				sortBy.totalSpentAsce();
			} else if (filter === 'remainingAsce') {
				sortBy.remainingAsce();
			} else if (filter === 'expenseListAsce') {
				sortBy.expenseListAsce();
			} else if (filter === 'categoryDesc') {
				sortBy.categoryDesc();
			} else if (filter === 'maxAmountDesc') {
				sortBy.maxAmountDesc();
			} else if (filter === 'totalSpentDesc') {
				sortBy.totalSpentDesc();
			} else if (filter === 'remainingDesc') {
				sortBy.remainingDesc();
			} else if (filter === 'expenseListDesc') {
				sortBy.expenseListDesc();
				console.log('wow');
			} else {
				sortBy.timeDesc();
			}
		}
	}, [expenses, filter, toggleFilter]);

	useEffect(() => {
		if (search.length > 0) {
			setRenderExpenses(
				filteredExpenses.filter((item) =>
					item.category.toLowerCase().includes(search.toLowerCase())
				)
			);
		} else {
			setRenderExpenses(filteredExpenses);
		}
	}, [search, filteredExpenses]);

	useEffect(() => {
		if (successCreate) {
			navigate(`/expense/${expenseCreate._id}`);
			dispatch({ type: CREATE_NEW_EXPENSE_RESET });
		}
		dispatch(listMyExpenses());
	}, [navigate, dispatch, successCreate, expenseCreate]);

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
								<div className="expenses-filter-container">
									<div className="filter-toggle">
										<div className="search-bar-container">
											<input
												type="text"
												onChange={(e) => setSearch(e.target.value)}
												className="search-bar"
												placeholder="Search With Category"
											/>
											<IoSearchSharp className="search-bar-icon" />
										</div>
										<IoFilterSharp
											className="filter-icon"
											onClick={() => setToggleFilter(!toggleFilter)}
										/>
									</div>

									{toggleFilter && (
										<div className="filter-category-container">
											<fieldset>
												<legend>Low to High</legend>
												<div>
													<input
														type="radio"
														name="filter"
														defaultChecked={filter === 'timeAsce'}
														id="timeAsce"
														value="timeAsce"
														onClick={(e) => setFilter(e.target.value)}
													/>
													<label htmlFor="timeAsce">Time</label>
												</div>
												<div>
													<input
														type="radio"
														name="filter"
														defaultChecked={filter === 'categoryAsce'}
														id="categoryAsce"
														value="categoryAsce"
														onClick={(e) => setFilter(e.target.value)}
													/>
													<label htmlFor="categoryAsce">Category</label>
												</div>
												<div>
													<input
														type="radio"
														name="filter"
														defaultChecked={filter === 'maxAmountAsce'}
														id="maxAmountAsce"
														value="maxAmountAsce"
														onClick={(e) => setFilter(e.target.value)}
													/>
													<label htmlFor="maxAmountAsce">Max Amount</label>
												</div>
												<div>
													<input
														type="radio"
														name="filter"
														defaultChecked={filter === 'totalSpentAsce'}
														id="totalSpentAsce"
														value="totalSpentAsce"
														onClick={(e) => setFilter(e.target.value)}
													/>
													<label htmlFor="totalSpentAsce">Total Spent</label>
												</div>
												<div>
													<input
														type="radio"
														name="filter"
														defaultChecked={filter === 'remainingAsce'}
														id="remainingAsce"
														value="remainingAsce"
														onClick={(e) => setFilter(e.target.value)}
													/>
													<label htmlFor="remainingAsce">Remaining</label>
												</div>
												<div>
													<input
														type="radio"
														name="filter"
														defaultChecked={filter === 'expenseListAsce'}
														id="expenseListAsce"
														value="expenseListAsce"
														onClick={(e) => setFilter(e.target.value)}
													/>
													<label htmlFor="expenseListAsce">Expense List</label>
												</div>
											</fieldset>
											<fieldset>
												<legend>High to Low</legend>
												<div>
													<input
														type="radio"
														name="filter"
														defaultChecked={filter === ''}
														id="timeDesc"
														value=""
														onClick={(e) => setFilter(e.target.value)}
													/>
													<label htmlFor="timeDesc">Time</label>
												</div>
												<div>
													<input
														type="radio"
														name="filter"
														defaultChecked={filter === 'categoryDesc'}
														id="categoryDesc"
														value="categoryDesc"
														onClick={(e) => setFilter(e.target.value)}
													/>
													<label htmlFor="categoryDesc">Category</label>
												</div>
												<div>
													<input
														type="radio"
														name="filter"
														defaultChecked={filter === 'maxAmountDesc'}
														id="maxAmountDesc"
														value="maxAmountDesc"
														onClick={(e) => setFilter(e.target.value)}
													/>
													<label htmlFor="maxAmountDesc">Max Amount</label>
												</div>
												<div>
													<input
														type="radio"
														name="filter"
														defaultChecked={filter === 'totalSpentDesc'}
														id="totalSpentDesc"
														value="totalSpentDesc"
														onClick={(e) => setFilter(e.target.value)}
													/>
													<label htmlFor="totalSpentDesc">Total Spent</label>
												</div>
												<div>
													<input
														type="radio"
														name="filter"
														defaultChecked={filter === 'remainingDesc'}
														id="remainingDesc"
														value="remainingDesc"
														onClick={(e) => setFilter(e.target.value)}
													/>
													<label htmlFor="remainingDesc">Remaining</label>
												</div>
												<div>
													<input
														type="radio"
														name="filter"
														defaultChecked={filter === 'expenseListDesc'}
														id="expenseListDesc"
														value="expenseListDesc"
														onClick={(e) => setFilter(e.target.value)}
													/>
													<label htmlFor="expenseListDesc">Expense List</label>
												</div>
											</fieldset>
											<div className="filter-button-container">
												<button
													className="primary-button filter-button"
													onClick={() => setToggleFilter(false)}
												>
													<IoCheckmarkSharp className="margin-right" />
													Apply
												</button>
												<button
													className="primary-delete filter-button"
													onClick={() => {
														setFilter('');
														setTimeout(() => setToggleFilter(false), 5);
													}}
												>
													<IoCloseSharp className="margin-right" />
													Clear
												</button>
											</div>
										</div>
									)}
								</div>
								<div className="expenses-grid">
									{renderExpenses &&
										renderExpenses.map((expense, idx) => (
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
