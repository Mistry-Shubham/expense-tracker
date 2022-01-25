import { useState } from 'react';
import { IoLogInSharp, IoMenuSharp, IoAddSharp } from 'react-icons/io5';
import './components-style.css';

const Header = () => {
	const [show, setShow] = useState(false);

	return (
		<header className="header">
			<div className="container">
				<h1 className="title">Expense Tracker</h1>
				<div className="navs" id={show ? 'hidden' : ''}>
					<button className="add-expense-button primary-button">
						<IoAddSharp className="margin-right" />
						Add Expense
					</button>
					<button className="login-button primary-button">
						<IoLogInSharp className="margin-right" />
						Login
					</button>
				</div>
				<div className="menu">
					<IoMenuSharp onClick={() => setShow(!show)} />
				</div>
			</div>
		</header>
	);
};

export default Header;
