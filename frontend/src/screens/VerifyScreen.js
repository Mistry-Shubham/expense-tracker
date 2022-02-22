import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IoMailUnreadSharp } from 'react-icons/io5';
import { USER_REGISTER_RESET } from '../constants/userConstants';
import './screens-style.css';

const VerifyScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [counter, setCounter] = useState(15);

	const { userInfo: registerInfo } = useSelector((state) => state.userRegister);

	const { userInfo } = useSelector((state) => state.userLogin);

	useEffect(() => {
		if (userInfo && userInfo.isVerified && !registerInfo) {
			navigate('/');
		}
		if (registerInfo) {
			setFirstName(registerInfo.firstName);
			setLastName(registerInfo.lastName);
			setEmail(registerInfo.email);
		} else {
			navigate('/register');
		}
	}, [registerInfo, userInfo]);

	useEffect(() => {
		if (counter === 0) {
			navigate('/login');
			dispatch({ type: USER_REGISTER_RESET });
		}
		const timer =
			counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
		return () => clearInterval(timer);
	}, [counter]);

	return (
		<div className="main-container">
			<div className="verify-screen">
				<div className="verify-screen-container">
					<h2 className="screen-title">
						Verify Your Email to finish registration for Expense Tracker.
					</h2>
					<IoMailUnreadSharp className="verify-icon" />
					<p className="verify-content">
						Thank you <b>{firstName}</b> <b>{lastName}</b>,
					</p>
					<p className="verify-content">
						Please Confirm that <b>{email}</b> is your email address and check
						your inbox for verification.{' '}
					</p>
					<p>Redirecting to Login in {counter}s</p>
				</div>
			</div>
		</div>
	);
};

export default VerifyScreen;
