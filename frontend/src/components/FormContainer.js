const FormContainer = ({ handler, children }) => {
	return (
		<div className="form-container">
			<form onSubmit={handler}>{children}</form>
		</div>
	);
};

export default FormContainer;
