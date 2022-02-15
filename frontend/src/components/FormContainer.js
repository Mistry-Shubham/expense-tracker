import { useState } from 'react';
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';
import './components-style.css';

const FormContainer = ({ handler, children }) => {
	return (
		<div className="form-container">
			<form onSubmit={handler}>{children}</form>
		</div>
	);
};

export const PasswordInput = ({ id, value, setValue, placeholder }) => {
	const [visibility, setVisibility] = useState(false);

	return (
		<div className="form-password-container">
			<input
				type={visibility ? 'text' : 'password'}
				id={id}
				className="form-password-input"
				style={{ color: 'black' }}
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				placeholder={placeholder}
			/>
			{visibility ? (
				<IoEyeOffSharp
					className="form-password-icon"
					onClick={() => setVisibility(!visibility)}
				/>
			) : (
				<IoEyeSharp
					className="form-password-icon"
					onClick={() => setVisibility(!visibility)}
				/>
			)}
		</div>
	);
};

export default FormContainer;
