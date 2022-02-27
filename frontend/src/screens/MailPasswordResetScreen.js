import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RiMailCheckFill, RiMailCloseFill } from 'react-icons/ri';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { passwordReset } from '../actions/userActions';

const MailPasswordResetScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { token } = useParams();

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, resetInfo, error } = useSelector(
		(state) => state.userPasswordReset
	);

	console.log(resetInfo);

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}

		if (!resetInfo) {
			dispatch(passwordReset({ step: 'step2', token }));
		}
	}, [navigate, dispatch, token, resetInfo]);

	return (
		<div className="main-container">
			<div className="verify-screen">
				<div className="verify-screen-container">
					<h2 className="screen-title">Your Email is being Verified.</h2>
					{loading && <Loader />}
					{error && <Message type="error">{error}</Message>}
					{resetInfo && resetInfo.message.includes('jwt expired') && (
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
					{resetInfo && resetInfo.message.includes('Account verified') && (
						<>
							<RiMailCheckFill className="verify-icon" />
							<Message type="success">
								Your email is verified. You can reset your password now.
							</Message>
						</>
					)}
				</div>
				{resetInfo && resetInfo.message.includes('jwt expired') && (
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

export default MailPasswordResetScreen;
