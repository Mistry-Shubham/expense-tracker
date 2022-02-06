import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserProfile } from '../actions/userActions';
import './screens-style.css';

const ProfileScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, user, error } = useSelector((state) => state.userProfile);

	useEffect(() => {
		if (!userInfo) {
			navigate('/login');
		}

		if (!user._id) {
			dispatch(getUserProfile());
		}
	}, [navigate, userInfo, dispatch, user]);

	return (
		<div className="main-container">
			<div className="profile-screen">
				<h2 className="screen-title">My Profile</h2>
				{loading ? (
					<Loader />
				) : error ? (
					<Message type="error">{error}</Message>
				) : (
					<div className="profile-screen-grid">
						<div className="first-grid">
							<p className="profile-content">
								<span className="bold">Full Name:</span>{' '}
								{`${user.firstName} ${user.lastName}`}
							</p>
							<p className="profile-content">
								<span className="bold">E-Mail:</span> {user.email}
							</p>
							<p className="profile-content">
								<span className="bold">Date of Birth:</span>{' '}
								{user.dateOfBirth.split('-')[2]}/
								{user.dateOfBirth.split('-')[1]}/
								{user.dateOfBirth.split('-')[0]}
							</p>
							<p className="profile-content">
								<span className="bold">Age:</span> {user.age}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfileScreen;
