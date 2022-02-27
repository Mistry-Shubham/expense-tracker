import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RiMailCheckFill, RiMailCloseFill } from 'react-icons/ri';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { verifyUserEmail } from '../actions/userActions';
import { USER_EMAIL_VERIFY_RESET } from '../constants/userConstants';

// $ window.close() to close tab
const MailVerifyScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { token } = useParams();

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, verifyInfo, error } = useSelector(
		(state) => state.userEmailVerify
	);

	useEffect(() => {
		dispatch({ type: USER_EMAIL_VERIFY_RESET });
	}, [dispatch]);

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}

		if (!verifyInfo) {
			dispatch(verifyUserEmail(token));
		}
	}, [navigate, dispatch, token, verifyInfo]);

	useEffect(() => {
		if (verifyInfo && verifyInfo.message.includes('your account is verfied')) {
			dispatch({ type: USER_EMAIL_VERIFY_RESET });
		}
	}, [dispatch, verifyInfo]);

	return (
		<div className="main-container">
			<div className="verify-screen">
				<div className="verify-screen-container">
					<h2 className="screen-title">Your Email is being Verified.</h2>
					{loading && <Loader />}
					{error && <Message type="error">{error}</Message>}
					{verifyInfo && verifyInfo.message.includes('jwt expired') && (
						<>
							<RiMailCloseFill
								style={{ fill: 'rgb(200,0,0)' }}
								className="verify-icon"
							/>
							<Message type="error">
								Failed to verify your email, token expired try again.{' '}
							</Message>
						</>
					)}{' '}
					{verifyInfo &&
						verifyInfo.message.includes('your account is verfied') && (
							<>
								<RiMailCheckFill className="verify-icon" />
								<Message type="success">
									Your email is verified. You can login now.
								</Message>
							</>
						)}
				</div>
				{verifyInfo && verifyInfo.message.includes('jwt expired') && (
					<Link
						className="remove-link-underline"
						style={{ marginTop: '10px' }}
						to="/resend-verfication-email"
					>
						Resend Verification Email ?
					</Link>
				)}
			</div>
		</div>
	);
};

export default MailVerifyScreen;
