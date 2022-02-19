import { useContext } from 'react';
import { defaultAppContext } from '../Contexts';
import './components-style.css';

const ProgressBar = ({ progress, max }) => {
	const { defaultCurrency } = useContext(defaultAppContext);

	const percentage = (progress / max) * 100;
	const remaining = max - progress;

	let progressColor;

	if (percentage < 50) {
		progressColor = '#28a745';
	} else if (percentage < 75) {
		progressColor = '#007bff';
	} else if (percentage < 90) {
		progressColor = '#ffc107';
	} else {
		progressColor = '#dc3545';
	}

	const progressContainer = {
		height: '25px',
		width: '100%',
		backgroundColor: 'whitesmoke',
		borderRadius: '40px',
		margin: '10px 0px',
		position: 'relative',
		overflow: 'hidden',
	};

	const progressIndicator = {
		height: '25px',
		width: percentage > 100 ? '100%' : `${percentage}%`,
		borderRadius: '40px',
		backgroundColor: `${progressColor}`,
		textAlign: 'center',
	};

	return (
		<div style={progressContainer} className="progress-bar-container">
			<p className="para">
				{defaultCurrency && defaultCurrency.symbol}
				{remaining}
			</p>
			<div style={progressIndicator}>
				<div>{percentage > 100 ? 'Limit Exceeded' : ''}</div>
			</div>
		</div>
	);
};

export default ProgressBar;
