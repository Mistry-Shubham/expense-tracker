import {
	EXPENSE_MY_LIST_REQUEST,
	EXPENSE_MY_LIST_SUCCESS,
	EXPENSE_MY_LIST_FAIL,
	CREATE_NEW_EXPENSE_REQUEST,
	CREATE_NEW_EXPENSE_SUCCESS,
	CREATE_NEW_EXPENSE_FAIL,
	CREATE_NEW_EXPENSE_RESET,
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

export const createNewExpenseReducer = (state = { expense: {} }, action) => {
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
