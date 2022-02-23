import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer, { PasswordInput } from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { resendEmail } from '../actions/userActions';
import { USER_RESEND_EMAIL_RESET } from '../constants/userConstants';
import './screens-style.css';

const ResendEmail = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, resendInfo, error } = useSelector(
		(state) => state.userResendEmail
	);

	useEffect(() => {
		if (resendInfo && resendInfo.status === 'success') {
			navigate('/login');
			setEmail('');
			setPassword('');
			dispatch({ type: USER_RESEND_EMAIL_RESET });
		}
	}, [resendInfo]);

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
		dispatch({ type: USER_RESEND_EMAIL_RESET });
	}, [userInfo, navigate]);

	const resendEmailHandler = (e) => {
		e.preventDefault();
		dispatch(resendEmail(email, password));
	};

	return (
		<div className="main-container">
			<div className="resend-email-screen">
				<h2 className="screen-title">Resend Verification Email</h2>
				<FormContainer handler={resendEmailHandler}>
					{error && <Message type="error">{error}</Message>}

					<label htmlFor="email" className="form-label">
						E-Mail
					</label>
					<input
						type="email"
						id="email"
						className="form-input"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your E-mail"
					/>

					<span className="spacer"></span>

					<label htmlFor="password" className="form-label">
						Password
					</label>
					<PasswordInput
						id="password"
						value={password}
						setValue={setPassword}
						placeholder="Enter your Password"
					/>

					<span className="spacer"></span>

					<button
						type="submit"
						className="primary-button resend-email-button"
						disabled={loading || email.length === 0 || password.length === 0}
					>
						{loading ? (
							<Loader border="3px" size="30px" color="green" />
						) : (
							<>Resend Email</>
						)}
					</button>
				</FormContainer>
				<p className="link">
					<Link className="remove-link-underline" to="/login">
						Go back to Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default ResendEmail;
