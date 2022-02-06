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
} from '../constants/userConstants';

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
