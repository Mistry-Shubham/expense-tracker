import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_RESET,
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
	USER_RESET_PASSWORD_REQUEST,
	USER_RESET_PASSWORD_SUCCESS,
	USER_RESET_PASSWORD_FAIL,
	USER_RESET_PASSWORD_RESET,
	USER_RESEND_EMAIL_REQUEST,
	USER_RESEND_EMAIL_SUCCESS,
	USER_RESEND_EMAIL_FAIL,
	USER_RESEND_EMAIL_RESET,
	USER_EMAIL_VERIFY_REQUEST,
	USER_EMAIL_VERIFY_SUCCESS,
	USER_EMAIL_VERIFY_FAIL,
	USER_EMAIL_VERIFY_RESET,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGIN_RESET:
			return {};
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

export const userPasswordResetReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_RESET_PASSWORD_REQUEST:
			return { loading: true };
		case USER_RESET_PASSWORD_SUCCESS:
			return { loading: false, resetInfo: action.payload };
		case USER_RESET_PASSWORD_FAIL:
			return { loading: false, error: action.payload };
		case USER_RESET_PASSWORD_RESET:
			return {};
		default:
			return state;
	}
};

export const userResendEmailReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_RESEND_EMAIL_REQUEST:
			return { loading: true };
		case USER_RESEND_EMAIL_SUCCESS:
			return { loading: false, resendInfo: action.payload };
		case USER_RESEND_EMAIL_FAIL:
			return { loading: false, error: action.payload };
		case USER_RESEND_EMAIL_RESET:
			return {};
		default:
			return state;
	}
};

export const userEmailVerifyReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_EMAIL_VERIFY_REQUEST:
			return { loading: true };
		case USER_EMAIL_VERIFY_SUCCESS:
			return { loading: false, verifyInfo: action.payload };
		case USER_EMAIL_VERIFY_FAIL:
			return { loading: false, error: action.payload };
		case USER_EMAIL_VERIFY_RESET:
			return {};
		default:
			return state;
	}
};
