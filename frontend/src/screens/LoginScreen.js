import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoLogInSharp } from 'react-icons/io5';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { userInfo } = useSelector((state) => state.userLogin);

	useEffect(() => {
		if (userInfo._id) {
			navigate('/');
		}
	}, [userInfo, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
		navigate('/');
	};

	return (
		<div className="main-container">
			<div className="login-screen">
				{false ? (
					<Loader />
				) : false ? (
					<Message>Helo</Message>
				) : (
					<>
						<h2 className="screen-title">Login</h2>
						<FormContainer handler={submitHandler}>
							<label htmlFor="email" className="form-label">
								E-Mail
							</label>
							<input
								type="text"
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
							<input
								type="password"
								id="password"
								className="form-input"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter your Password"
							/>

							<span className="spacer"></span>

							<button className="primary-button form-submit-button">
								<IoLogInSharp className="margin-right" />
								Login
							</button>
						</FormContainer>
					</>
				)}
			</div>
		</div>
	);
};

export default LoginScreen;
