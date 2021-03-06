import axios from 'axios';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_PROFILE_REQUEST,
	USER_PROFILE_SUCCESS,
	USER_PROFILE_FAIL,
	USER_PROFILE_RESET,
	USER_PROFILE_UPDATE_REQUEST,
	USER_PROFILE_UPDATE_SUCCESS,
	USER_PROFILE_UPDATE_FAIL,
	USER_PROFILE_UPDATE_RESET,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_RESET_PASSWORD_REQUEST,
	USER_RESET_PASSWORD_SUCCESS,
	USER_RESET_PASSWORD_FAIL,
	USER_RESEND_EMAIL_REQUEST,
	USER_RESEND_EMAIL_SUCCESS,
	USER_RESEND_EMAIL_FAIL,
	USER_EMAIL_VERIFY_REQUEST,
	USER_EMAIL_VERIFY_SUCCESS,
	USER_EMAIL_VERIFY_FAIL,
} from '../constants/userConstants';
import { EXPENSE_BY_ID_RESET } from '../constants/expenseConstants';

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/users/login',
			{ email, password },
			config
		);

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (err) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const logout = () => async (dispatch) => {
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_PROFILE_RESET });
	dispatch({ type: USER_PROFILE_UPDATE_RESET });
	dispatch({ type: EXPENSE_BY_ID_RESET });
	localStorage.removeItem('userInfo');
};

export const getUserProfile = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_PROFILE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get('api/users/profile', config);

		dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: USER_PROFILE_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_PROFILE_UPDATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put('/api/users/profile', user, config);

		dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: USER_PROFILE_UPDATE_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const register = (user) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post('/api/users', user, config);

		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const passwordReset = (newData) => async (dispatch) => {
	try {
		const { email, password, resetId, step, token } = newData;
		dispatch({ type: USER_RESET_PASSWORD_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		if (step === 'step1') {
			const { data } = await axios.post(
				`/api/users/password-reset/${step}/CZqFzu`,
				{ email },
				config
			);
			dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data });
		}
		if (step === 'step2') {
			const { data } = await axios.get(
				`/api/users/password-reset/${step}/${token}`,
				config
			);
			dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data });
		}
		if (step === 'step3') {
			const { data } = await axios.put(
				`/api/users/password-reset/${step}/CZqFzu`,
				{ resetId, password },
				config
			);
			dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data });
		}
	} catch (err) {
		dispatch({
			type: USER_RESET_PASSWORD_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const resendEmail = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_RESEND_EMAIL_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.put(
			'/api/users/resend-verification',
			{ email, password },
			config
		);

		dispatch({ type: USER_RESEND_EMAIL_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: USER_RESEND_EMAIL_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const verifyUserEmail = (token) => async (dispatch) => {
	try {
		dispatch({ type: USER_EMAIL_VERIFY_REQUEST });

		const { data } = await axios.get(`/api/users/verify/${token}`);

		dispatch({ type: USER_EMAIL_VERIFY_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: USER_EMAIL_VERIFY_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};
