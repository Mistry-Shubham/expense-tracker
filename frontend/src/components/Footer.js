import './components-style.css';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<h4 className="content">
					Copyright {new Date().getFullYear()}. All Rights Reserved.
				</h4>
			</div>
		</footer>
	);
};

export default Footer;
