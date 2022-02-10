import {
	EXPENSE_MY_LIST_REQUEST,
	EXPENSE_MY_LIST_SUCCESS,
	EXPENSE_MY_LIST_FAIL,
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
