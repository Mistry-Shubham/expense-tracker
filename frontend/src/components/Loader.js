const Loader = ({ size = '50px', border = '6px', color = '#3498db' }) => {
	return (
		<div
			style={{
				border: `${border} solid #f3f3f3`,
				borderTop: `${border} solid ${color}`,
				height: `${size}`,
				width: `${size}`,
			}}
			className="loader-spinner"
		></div>
	);
};

export default Loader;
