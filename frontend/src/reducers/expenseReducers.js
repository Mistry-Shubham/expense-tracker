import {
	EXPENSE_MY_LIST_REQUEST,
	EXPENSE_MY_LIST_SUCCESS,
	EXPENSE_MY_LIST_FAIL,
	CREATE_NEW_EXPENSE_REQUEST,
	CREATE_NEW_EXPENSE_SUCCESS,
	CREATE_NEW_EXPENSE_FAIL,
	CREATE_NEW_EXPENSE_RESET,
	EXPENSE_BY_ID_REQUEST,
	EXPENSE_BY_ID_SUCCESS,
	EXPENSE_BY_ID_FAIL,
	EXPENSE_BY_ID_RESET,
	ADD_EXPENSE_TO_LIST_REQUEST,
	ADD_EXPENSE_TO_LIST_SUCCESS,
	ADD_EXPENSE_TO_LIST_FAIL,
	ADD_EXPENSE_TO_LIST_RESET,
	DELETE_ITEM_FROM_LIST_REQUEST,
	DELETE_ITEM_FROM_LIST_SUCCESS,
	DELETE_ITEM_FROM_LIST_FAIL,
	DELETE_ITEM_FROM_LIST_RESET,
	DELETE_EXPENSE_REQUEST,
	DELETE_EXPENSE_SUCCESS,
	DELETE_EXPENSE_FAIL,
	DELETE_EXPENSE_RESET,
	EDIT_LIST_ITEM_REQUEST,
	EDIT_LIST_ITEM_SUCCESS,
	EDIT_LIST_ITEM_FAIL,
	EDIT_LIST_ITEM_RESET,
	EDIT_EXPENSE_REQUEST,
	EDIT_EXPENSE_SUCCESS,
	EDIT_EXPENSE_FAIL,
	EDIT_EXPENSE_RESET,
} from '../constants/expenseConstants';

export const expenseMyListReducer = (state = { expenses: [] }, action) => {
	switch (action.type) {
		case EXPENSE_MY_LIST_REQUEST:
			return { loading: true };
		case EXPENSE_MY_LIST_SUCCESS:
			return { loading: false, expenses: action.payload };
		case EXPENSE_MY_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const expenseCreateNewReducer = (state = { expense: {} }, action) => {
	switch (action.type) {
		case CREATE_NEW_EXPENSE_REQUEST:
			return { ...state, loading: true };
		case CREATE_NEW_EXPENSE_SUCCESS:
			return { loading: false, expense: action.payload, success: true };
		case CREATE_NEW_EXPENSE_FAIL:
			return { loading: false, error: action.payload };
		case CREATE_NEW_EXPENSE_RESET:
			return { expense: {} };
		default:
			return state;
	}
};

export const expenseGetByIdReducer = (state = { expense: {} }, action) => {
	switch (action.type) {
		case EXPENSE_BY_ID_REQUEST:
			return { ...state, loading: true };
		case EXPENSE_BY_ID_SUCCESS:
			return { loading: false, expense: action.payload };
		case EXPENSE_BY_ID_FAIL:
			return { loading: false, error: action.payload };
		case EXPENSE_BY_ID_RESET:
			return { expense: {} };
		default:
			return state;
	}
};

export const expenseAddToListReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_EXPENSE_TO_LIST_REQUEST:
			return { ...state, loading: true };
		case ADD_EXPENSE_TO_LIST_SUCCESS:
			return { loading: false, success: true };
		case ADD_EXPENSE_TO_LIST_FAIL:
			return { loading: false, error: action.payload };
		case ADD_EXPENSE_TO_LIST_RESET:
			return {};
		default:
			return state;
	}
};

export const expenseDeleteItemReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_ITEM_FROM_LIST_REQUEST:
			return { ...state, loading: true };
		case DELETE_ITEM_FROM_LIST_SUCCESS:
			return { loading: false, expense: action.payload, success: true };
		case DELETE_ITEM_FROM_LIST_FAIL:
			return { loading: false, error: action.payload };
		case DELETE_ITEM_FROM_LIST_RESET:
			return {};
		default:
			return state;
	}
};

export const expenseDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_EXPENSE_REQUEST:
			return { ...state, loading: true };
		case DELETE_EXPENSE_SUCCESS:
			return { loading: false, expense: action.payload, success: true };
		case DELETE_EXPENSE_FAIL:
			return { loading: false, error: action.payload };
		case DELETE_EXPENSE_RESET:
			return {};
		default:
			return state;
	}
};

export const expenseEditListItemReducer = (state = {}, action) => {
	switch (action.type) {
		case EDIT_LIST_ITEM_REQUEST:
			return { ...state, loading: true };
		case EDIT_LIST_ITEM_SUCCESS:
			return { loading: false, expense: action.payload, success: true };
		case EDIT_LIST_ITEM_FAIL:
			return { loading: false, error: action.payload };
		case EDIT_LIST_ITEM_RESET:
			return {};
		default:
			return state;
	}
};

export const expenseEditReducer = (state = {}, action) => {
	switch (action.type) {
		case EDIT_EXPENSE_REQUEST:
			return { ...state, loading: true };
		case EDIT_EXPENSE_SUCCESS:
			return { loading: false, expense: action.payload, success: true };
		case EDIT_EXPENSE_FAIL:
			return { loading: false, error: action.payload };
		case EDIT_EXPENSE_RESET:
			return {};
		default:
			return state;
	}
};
