import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
	IoLogInSharp,
	IoMenuSharp,
	IoAddSharp,
	IoChevronDownSharp,
	IoPersonSharp,
	IoLogOutSharp,
	IoIdCardSharp,
} from 'react-icons/io5';
import { AddExpenseContext } from '../Contexts';
import { logout } from '../actions/userActions';
import './components-style.css';

const Header = () => {
	const dispatch = useDispatch();

	const { addExpenseSection, setAddExpenseSection } =
		useContext(AddExpenseContext);

	const [show, setShow] = useState(false);
	const [dropdown, setDropdown] = useState(true);

	const { userInfo } = useSelector((state) => state.userLogin);

	const toggleAddExpense = () => setAddExpenseSection(!addExpenseSection);

	const logoutHandler = () => {
		dispatch(logout());
		setDropdown(true);
		setShow(false);
		setAddExpenseSection(false);
	};

	return (
		<header className="header">
			<div className="container">
				<Link
					to="/"
					onClick={() => {
						setDropdown(true);
						setShow(false);
						setAddExpenseSection(false);
					}}
					className="remove-link-underline"
				>
					<h1 className="title">Expense Tracker</h1>
				</Link>
				<div className="navs" id={show ? 'hidden' : ''}>
					<Link to="/" className="remove-link-underline">
						<button
							onClick={toggleAddExpense}
							className="add-expense-button primary-button"
						>
							<IoAddSharp className="margin-right" />
							Add Expense
						</button>
					</Link>
					{userInfo ? (
						<div className="dropdown">
							<button
								onClick={() => {
									setDropdown(!dropdown);
								}}
								className="primary-button login-button"
							>
								{<IoPersonSharp className="margin-right" />}
								{userInfo.firstName}
								{<IoChevronDownSharp className="margin-left" />}
							</button>
							<div
								id={dropdown ? 'dropdown-content-close' : 'dropdown-content'}
							>
								<Link
									to={'/profile'}
									onClick={() => {
										setDropdown(true);
										setShow(false);
									}}
									className="remove-link-underline"
								>
									<div className="dropdown-item">
										<IoIdCardSharp className="margin-right dropdown-icon" />
										{`Profile - ${userInfo.firstName} ${userInfo.lastName}`}
									</div>
								</Link>
								<Link
									onClick={logoutHandler}
									to={'/login'}
									className="remove-link-underline"
								>
									<div className="dropdown-item">
										<IoLogOutSharp className="margin-right dropdown-icon" />
										Logout
									</div>
								</Link>
							</div>
						</div>
					) : (
						<Link to="/login" className="remove-link-underline">
							<button className="login-button primary-button">
								<IoLogInSharp className="margin-right" />
								Login
							</button>
						</Link>
					)}
				</div>
				<div className="menu">
					<IoMenuSharp className="menu-icon" onClick={() => setShow(!show)} />
				</div>
			</div>
		</header>
	);
};

export default Header;
