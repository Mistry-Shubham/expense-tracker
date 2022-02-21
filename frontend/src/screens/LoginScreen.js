import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoLogInSharp } from 'react-icons/io5';
import { FiExternalLink } from 'react-icons/fi';
import FormContainer, { PasswordInput } from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../actions/userActions';
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
		}
	}, [userInfo, navigate]);

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
						to="/reset-pssword"
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
				{error && error.includes('credentials') && (
					<p style={{ textAlign: 'center' }}>Hello</p>
				)}
			</div>
		</div>
	);
};

export default LoginScreen;
