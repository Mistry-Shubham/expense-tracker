import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AddExpenseContext } from './Contexts';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import Footer from './components/Footer';
import './App.css';

const App = () => {
	const [addExpenseSection, setAddExpenseSection] = useState(false);

	return (
		<AddExpenseContext.Provider
			value={{ addExpenseSection, setAddExpenseSection }}
		>
			<div className="background-image">
				<div className="background-filter">
					<Header />
					<main className="App">
						<Routes>
							<Route path="/" element={<HomeScreen />} />
							<Route path="/login" element={<LoginScreen />} />
							<Route path="/profile" element={<ProfileScreen />} />
							<Route path="/register" element={<RegisterScreen />} />
						</Routes>
					</main>
					<Footer />
				</div>
			</div>
		</AddExpenseContext.Provider>
	);
};

export default App;
