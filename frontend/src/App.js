import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const App = () => {
	return (
		<div className="background-image">
			<div className="background-filter">
				<Header />
				<main className="App"></main>
				<Footer />
			</div>
		</div>
	);
};

export default App;
