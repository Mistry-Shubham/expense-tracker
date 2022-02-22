import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer, { PasswordInput } from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { passwordReset } from '../actions/userActions';
import { USER_RESET_PASSWORD_RESET } from '../constants/userConstants';
import './screens-style.css';

const ResetPasswordScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passMatchError, setPassMatchError] = useState(null);
	const [page, setpage] = useState(false);
	const [resetId, setresetId] = useState('');

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, resetInfo, error } = useSelector(
		(state) => state.userPasswordReset
	);

	useEffect(() => {
		if (resetInfo && resetInfo.message === 'Password Reset Successful') {
			setConfirmPassword('');
			setPassword('');
			setEmail('');
			setpage(false);
			navigate('/login');
			dispatch({ type: USER_RESET_PASSWORD_RESET });
		}
		if (resetInfo && resetInfo.resetId) {
			setpage(true);
			setresetId(resetInfo.resetId);
		}
	}, [resetInfo]);

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
		dispatch({ type: USER_RESET_PASSWORD_RESET });
	}, [navigate, userInfo]);

	const emailSubmitHndler = (e) => {
		e.preventDefault();
		dispatch(
			passwordReset({
				step: 'step1',
				email,
			})
		);
	};

	const passwordResetHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setPassMatchError('Passwords do not match');
		} else {
			dispatch(
				passwordReset({
					step: 'step3',
					resetId,
					password,
				})
			);
			setPassMatchError(null);
		}
	};

	return (
		<div className="main-container">
			<div className="reset-password-screen">
				<h2 className="screen-title">Reset Password</h2>
				{page ? (
					<FormContainer handler={passwordResetHandler}>
						{error && <Message type="error">{error}</Message>}
						{passMatchError && <Message type="error">{passMatchError}</Message>}
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
						{password.includes(' ') ? (
							<div style={{ color: 'red' }}>
								Password cannot contain any space
							</div>
						) : null}

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

						<button
							type="submit"
							className="primary-button reset-password-button"
						>
							{loading ? (
								<Loader border="3px" size="30px" color="green" />
							) : (
								<>Reset Password</>
							)}
						</button>
					</FormContainer>
				) : (
					<FormContainer handler={emailSubmitHndler}>
						{error && <Message type="error">{error}</Message>}

						<label htmlFor="email" className="form-label">
							Email:
						</label>
						<input
							type="email"
							id="email"
							className="form-input"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter Email for Password Reset"
						/>

						<span className="spacer"></span>

						<button
							type="submit"
							className="primary-button reset-password-button"
						>
							{loading ? (
								<Loader border="3px" size="30px" color="green" />
							) : (
								<>Submit</>
							)}
						</button>
					</FormContainer>
				)}
				<p className="link">
					<Link className="remove-link-underline" to="/login">
						Go back to Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default ResetPasswordScreen;
