import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { defaultAppContext } from './Contexts';
import currencies from './currencies';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import VerifyScreen from './screens/VerifyScreen';
import ExpenseScreen from './screens/ExpenseScreen';
import ExpenseEditScreen from './screens/ExpenseEditScreen';
import Footer from './components/Footer';
import './App.css';

const App = () => {
	const [addExpenseSection, setAddExpenseSection] = useState(false);
	const [defaultCurrency, setDefaultCurrency] = useState({
		name: 'Indian Rupee',
		code: 'INR',
		symbol: '₹',
		id: 69,
	});

	const { userInfo } = useSelector((state) => state.userLogin);

	useEffect(() => {
		if (userInfo && userInfo.defaultCurrency) {
			setDefaultCurrency(userInfo.defaultCurrency);
		}
	}, [userInfo]);

	return (
		<defaultAppContext.Provider
			value={{
				addExpenseSection,
				setAddExpenseSection,
				defaultCurrency,
				setDefaultCurrency,
			}}
		>
			<div className="background-image">
				<div className="background-filter">
					<Header />
					<main className="App">
						<Routes>
							<Route path="/" element={<HomeScreen />} />
							<Route path="/login" element={<LoginScreen />} />
							<Route path="/reset-password" element={<ResetPasswordScreen />} />
							<Route path="/profile" element={<ProfileScreen />} />
							<Route path="/register" element={<RegisterScreen />} />
							<Route path="/verify" element={<VerifyScreen />} />
							<Route path="/expense/:id" element={<ExpenseScreen />} />
							<Route path="/expense/:id/edit" element={<ExpenseEditScreen />} />
						</Routes>
					</main>
					<Footer />
				</div>
			</div>
		</defaultAppContext.Provider>
	);
};

export default App;
