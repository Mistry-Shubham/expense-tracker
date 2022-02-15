import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoPersonAddSharp } from 'react-icons/io5';
import { FiExternalLink } from 'react-icons/fi';
import FormContainer, { PasswordInput } from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { register } from '../actions/userActions';
import { USER_REGISTER_RESET } from '../constants/userConstants';
import './screens-style.css';

const RegisterScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passMatchError, setPassMatchError] = useState(null);

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, error } = useSelector((state) => state.userRegister);

	useEffect(() => {
		if (userInfo) {
			navigate('/');
			dispatch({ type: USER_REGISTER_RESET });
		} else {
			dispatch({ type: USER_REGISTER_RESET });
		}
	}, [navigate, dispatch, userInfo]);

	const registerUserHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setPassMatchError('Passwords do not match');
		} else {
			dispatch(register({ firstName, lastName, email, dateOfBirth, password }));
			setPassMatchError(null);
		}
	};

	return (
		<div className="main-container">
			<div className="register-screen">
				<h2 className="screen-title">Register</h2>
				<FormContainer handler={registerUserHandler}>
					{error && <Message type="error">{error}</Message>}
					{passMatchError && <Message type="error">{passMatchError}</Message>}
					<div className="register-full-name">
						<div className="register-name">
							<label htmlFor="firstName" className="form-label">
								First Name:
							</label>
							<input
								required
								type="text"
								id="firstName"
								className="form-input"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								placeholder="Enter your First Name"
							/>
						</div>

						<div className="register-name">
							<label htmlFor="lastName" className="form-label">
								Last Name:
							</label>
							<input
								required
								type="text"
								id="lastName"
								className="form-input"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								placeholder="Enter your Last Name"
							/>
						</div>
					</div>

					<span className="spacer"></span>

					<label htmlFor="email" className="form-label">
						E-Mail:
					</label>
					<input
						required
						type="email"
						id="email"
						className="form-input"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your E-Mail"
					/>

					<span className="spacer"></span>

					<label htmlFor="dateOfBirth" className="form-label">
						Date of Birth:
					</label>
					<input
						required
						type="date"
						id="dateOfBirth"
						className="form-input"
						value={dateOfBirth}
						onChange={(e) => setDateOfBirth(e.target.value)}
					/>

					<span className="spacer"></span>

					<label htmlFor="password" className="form-label">
						Password:
					</label>
					<PasswordInput
						id="password"
						value={password}
						setValue={setPassword}
						placeholder="Enter your Password"
						passCheck
					/>

					<span className="spacer"></span>

					<label htmlFor="confirmPassword" className="form-label">
						Confirm Password:
					</label>
					<PasswordInput
						id="confirmPassword"
						value={confirmPassword}
						setValue={setConfirmPassword}
						placeholder="Enter your Password again"
					/>
					{confirmPassword.length > 0 && password !== confirmPassword ? (
						<div style={{ color: 'red' }}>Passwords do not match</div>
					) : null}

					<span className="spacer"></span>
					<span className="spacer"></span>

					<button
						type="submit"
						className="primary-button register-submit-button"
						disabled={loading || password !== confirmPassword}
					>
						{loading ? (
							<Loader border="3px" size="30px" color="green" />
						) : (
							<>
								<IoPersonAddSharp className="margin-right" />
								Register
							</>
						)}
					</button>

					<span className="spacer"></span>

					<p>
						Already have an account?
						<Link className="redirect" to="/login">
							<span>
								Login.
								<FiExternalLink />
							</span>
						</Link>
					</p>
				</FormContainer>
			</div>
		</div>
	);
};

export default RegisterScreen;
