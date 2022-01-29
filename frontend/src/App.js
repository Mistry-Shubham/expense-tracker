import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import Footer from './components/Footer';
import './App.css';

const App = () => {
	return (
		<div className="background-image">
			<div className="background-filter">
				<Header />
				<main className="App">
					<Routes>
						<Route path="/" element={<HomeScreen />} />
						<Route path="/login" element={<LoginScreen />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</div>
	);
};

export default App;
