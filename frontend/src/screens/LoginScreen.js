import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoLogInSharp } from 'react-icons/io5';
import { FiExternalLink } from 'react-icons/fi';
import FormContainer, { PasswordInput } from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../actions/userActions';
import { USER_LOGIN_RESET } from '../constants/userConstants';
import './screens-style.css';

const LoginScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { loading, userInfo, error } = useSelector((state) => state.userLogin);

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		} else {
			dispatch({ type: USER_LOGIN_RESET });
		}
	}, [userInfo, navigate, dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<div className="main-container">
			<div className="login-screen">
				<h2 className="screen-title">Login</h2>
				<FormContainer handler={submitHandler}>
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

					<Link
						to="/reset-password"
						className="remove-link-underline forgot-password"
					>
						Forgot Password ?
					</Link>

					<button
						type="submit"
						className="primary-button form-submit-button"
						disabled={loading || email.length === 0 || password.length === 0}
					>
						{loading ? (
							<Loader border="3px" size="30px" color="green" />
						) : (
							<>
								<IoLogInSharp className="margin-right" />
								Login
							</>
						)}
					</button>

					<span className="spacer"></span>

					<p>
						Dont have an account?
						<Link className="redirect" to="/register">
							<span>
								Create a new account.
								<FiExternalLink />
							</span>
						</Link>
					</p>
				</FormContainer>
				{error && error.includes('Your account is not verified') && (
					<p className="resend-link">
						<Link
							className="remove-link-underline"
							to="/resend-verfication-email"
						>
							Resend verfication code
						</Link>
					</p>
				)}
			</div>
		</div>
	);
};

export default LoginScreen;
