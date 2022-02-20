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
	USER_REGISTER_RESET,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const userProfileReducer = (
	state = { user: { dateOfBirth: '' } },
	action
) => {
	switch (action.type) {
		case USER_PROFILE_REQUEST:
			return { ...state, loading: true };
		case USER_PROFILE_SUCCESS:
			return { loading: false, user: action.payload };
		case USER_PROFILE_FAIL:
			return { loading: false, error: action.payload };
		case USER_PROFILE_RESET:
			return { user: { dateOfBirth: '' } };
		default:
			return state;
	}
};

export const userUpdateProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_PROFILE_UPDATE_REQUEST:
			return { ...state, loading: true };
		case USER_PROFILE_UPDATE_SUCCESS:
			return { loading: false, user: action.payload, success: true };
		case USER_PROFILE_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case USER_PROFILE_UPDATE_RESET:
			return {};
		default:
			return state;
	}
};

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload, success: true };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		case USER_REGISTER_RESET:
			return {};
		default:
			return state;
	}
};
