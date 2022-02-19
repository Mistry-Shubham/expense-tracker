import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	IoPencilSharp,
	IoSettingsSharp,
	IoCloseSharp,
	IoCaretDownSharp,
} from 'react-icons/io5';
import { defaultAppContext } from '../Contexts';
import currencies from '../currencies';
import FormContainer, { PasswordInput } from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserProfile, updateUserProfile } from '../actions/userActions';
import { USER_PROFILE_UPDATE_RESET } from '../constants/userConstants';
import './screens-style.css';

const ProfileScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { defaultCurrency, setDefaultCurrency } = useContext(defaultAppContext);

	const [editScreen, setEditScreen] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [selectCurrency, setSelectCurrency] = useState(0);
	const [currency, setCurrency] = useState(defaultCurrency);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passMatchError, setPassMatchError] = useState(null);

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, user, error } = useSelector((state) => state.userProfile);

	const {
		loading: loadingUpdate,
		success: successUpdate,
		error: errorUpdate,
	} = useSelector((state) => state.userUpdateProfile);

	useEffect(() => {
		if (selectCurrency) {
			setCurrency(currencies.find((item) => item.id === selectCurrency));
		}
	}, [selectCurrency, currencies]);

	useEffect(() => {
		if (successUpdate) {
			dispatch(getUserProfile());
			setDefaultCurrency(currency);
			setEditScreen(false);
		}
	}, [successUpdate, currency]);

	useEffect(() => {
		if (!userInfo) {
			navigate('/login');
		}

		if (!user._id) {
			dispatch(getUserProfile());
		} else {
			dispatch({ type: USER_PROFILE_UPDATE_RESET });
		}
	}, [navigate, userInfo, dispatch, user]);

	const updateProfileHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setPassMatchError('Passwords do not match');
		} else {
			setPassMatchError(null);
			dispatch(
				updateUserProfile({
					firstName:
						firstName && firstName[0].toUpperCase() + firstName.substring(1),
					lastName:
						lastName && lastName[0].toUpperCase() + lastName.substring(1),
					email,
					dateOfBirth,
					currency,
					password,
				})
			);
			setFirstName('');
			setLastName('');
			setEmail('');
			setDateOfBirth('');
			setPassword('');
			setConfirmPassword('');
		}
	};

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
							{user.defaultCurrency && (
								<p className="profile-content">
									<span className="bold">Currency:</span>{' '}
									{user.defaultCurrency.name}
									{' - '}
									{user.defaultCurrency.symbol}
								</p>
							)}
							<button
								onClick={() => setEditScreen(!editScreen)}
								className="primary-button profile-edit-button"
							>
								<IoPencilSharp className="margin-right" />
								Edit Profile
							</button>
						</div>
					</div>
				)}
				{editScreen && (
					<div className="profile-edit-screen">
						<FormContainer handler={updateProfileHandler}>
							{passMatchError && (
								<Message type="error">{passMatchError}</Message>
							)}

							{errorUpdate && <Message type="error">{errorUpdate}</Message>}
							<IoCloseSharp
								onClick={() => setEditScreen(false)}
								className="profile-edit-exit"
							/>
							<div className="profile-edit-full-name">
								<div className="profile-edit-name">
									<label htmlFor="firstName" className="form-label">
										First Name:
									</label>
									<input
										type="text"
										id="firstName"
										className="form-input"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										placeholder={user.firstName}
									/>
								</div>

								<div className="profile-edit-name">
									<label htmlFor="lastName" className="form-label">
										Last Name:
									</label>
									<input
										type="text"
										id="lastName"
										className="form-input"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										placeholder={user.lastName}
									/>
								</div>
							</div>
							{firstName.includes(' ') || lastName.includes(' ') ? (
								<div style={{ color: 'red', textAlign: 'center' }}>
									First Name or Last Name cannot contain any space
								</div>
							) : null}
							{firstName.match(/^\d/) || lastName.match(/^\d/) ? (
								<div style={{ color: 'red' }}>
									First Name or Last Name cannot start with number
								</div>
							) : null}

							<span className="spacer"></span>

							<label htmlFor="email" className="form-label">
								E-Mail:
							</label>
							<input
								type="email"
								id="email"
								className="form-input"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder={user.email}
							/>
							{email.includes(' ') ? (
								<div style={{ color: 'red' }}>
									email cannot contain any space
								</div>
							) : null}
							{email.match(/^\d/) ? (
								<div style={{ color: 'red' }}>
									Email cannot start with number
								</div>
							) : null}

							<span className="spacer"></span>

							<label htmlFor="dateOfBirth" className="form-label">
								Date of Birth:
							</label>
							<input
								type="date"
								id="dateOfBirth"
								className="form-input"
								value={dateOfBirth}
								onChange={(e) => setDateOfBirth(e.target.value)}
							/>

							<span className="spacer"></span>

							<label htmlFor="currency" className="form-label">
								Currency:
							</label>
							<div className="form-select-container">
								<select
									required
									id="currency"
									className="form-select"
									onChange={(e) => setSelectCurrency(parseInt(e.target.value))}
									defaultValue="placeholder"
								>
									<option value="placeholder" disabled hidden>
										Select Your Default Currency
									</option>
									{currencies.map((item) => (
										<option
											key={item.id}
											value={item.id}
											className="form-select-option"
										>
											{item.name}
											{' = '}
											{item.symbol}
										</option>
									))}
								</select>
								<IoCaretDownSharp className="form-select-icon" />
							</div>

							<span className="spacer"></span>

							<label htmlFor="password" className="form-label">
								Password:
							</label>
							<PasswordInput
								id="password"
								value={password}
								setValue={setPassword}
								placeholder="Enter your New Password"
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
								placeholder="Enter your New Password again"
							/>
							{confirmPassword.length > 0 && password !== confirmPassword ? (
								<div style={{ color: 'red' }}>Passwords do not match</div>
							) : null}

							<span className="spacer"></span>
							<span className="spacer"></span>

							<div className="profile-edit-buttons">
								<button
									type="submit"
									className="primary-button update-profile-button"
									disabled={
										loadingUpdate ||
										password !== confirmPassword ||
										firstName.includes(' ') ||
										firstName.match(/^\d/) ||
										lastName.includes(' ') ||
										lastName.match(/^\d/) ||
										email.includes(' ') ||
										email.match(/^\d/) ||
										password.includes(' ')
									}
								>
									{loadingUpdate ? (
										<Loader border="3px" size="30px" color="green" />
									) : (
										<>
											<IoSettingsSharp className="margin-right" />
											Update
										</>
									)}
								</button>
								<button
									type="button"
									onClick={() => setEditScreen(false)}
									className="primary-button profile-button-close"
								>
									<IoCloseSharp className="margin-right" />
									Close
								</button>
							</div>
						</FormContainer>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfileScreen;
