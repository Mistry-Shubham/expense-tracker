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

export const PasswordInput = ({
	id,
	value,
	setValue,
	placeholder,
	passCheck = false,
}) => {
	const [visibility, setVisibility] = useState(false);
	const [passCheckDisplay, setPassCheckDisplay] = useState(false);
	const [checks, setChecks] = useState({
		length: false,
		letter: false,
		number: false,
		special: false,
	});

	const onFocusHandler = () => {
		setPassCheckDisplay(true);
	};

	const onBlurHandler = () => {
		setPassCheckDisplay(false);
	};

	const onKeyUpHandler = (e) => {
		const { value } = e.target;
		const passLength = value.length >= 8 && value.length <= 16;
		const letter = new RegExp('(?=.*[a-zA-Z])').test(value);
		const number = new RegExp('(?=.*[0-9])').test(value);
		const special = new RegExp('(?=.*[~!@#$%^&*<>?])').test(value);
		setChecks({
			passLength,
			letter,
			number,
			special,
		});
	};

	return (
		<>
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
					onFocus={onFocusHandler}
					onBlur={onBlurHandler}
					onKeyUp={onKeyUpHandler}
					maxLength="16"
					pattern={
						passCheck
							? '^(?=.*[0-9])(?=.*[a-z])(?=.*[~!@#$%^&*<>?])[a-zA-Z0-9~!@#$%^&*<>?]{8,16}$'
							: null
					}
					title={'Password must contain all of the following listed bellow'}
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
			{passCheck && (
				<PasswordValidator
					value={value}
					passCheckDisplay={passCheckDisplay}
					checks={checks}
				/>
			)}
		</>
	);
};

const PasswordValidator = ({ value, passCheckDisplay, checks }) => {
	const { passLength, letter, number, special } = checks;
	const checkLength = value.length;

	return (
		<>
			{passCheckDisplay && (
				<>
					<div className="pass-strength-meter">
						<div
							className={
								checkLength > 5 && (letter || number || special)
									? 'pass-strength-valid'
									: 'pass-strength-invalid'
							}
						></div>
						<div
							className={
								checkLength >= 8 &&
								((letter && number) ||
									(letter && special) ||
									(number && special))
									? 'pass-strength-valid'
									: 'pass-strength-invalid'
							}
						></div>
						<div
							className={
								checkLength > 10 && passLength && letter && number && special
									? 'pass-strength-valid'
									: 'pass-strength-invalid'
							}
						></div>
						<div
							className={
								checkLength >= 14 && passLength && letter && number && special
									? 'pass-strength-valid'
									: 'pass-strength-invalid'
							}
						></div>
					</div>
					<div className="pass-check-container">
						<p
							className={passLength ? 'pass-check-valid' : 'pass-check-invalid'}
						>
							Lenght 8-16 characters
						</p>
						<p className={letter ? 'pass-check-valid' : 'pass-check-invalid'}>
							Atlest 1 letter
						</p>
						<p className={number ? 'pass-check-valid' : 'pass-check-invalid'}>
							Atlest 1 number
						</p>
						<p className={special ? 'pass-check-valid' : 'pass-check-invalid'}>
							Atlest 1 special character {'~!@#*/$%^&*<>?'}
						</p>
					</div>
				</>
			)}
		</>
	);
};

export default FormContainer;
