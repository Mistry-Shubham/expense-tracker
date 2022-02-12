import axios from 'axios';
import {
	EXPENSE_MY_LIST_REQUEST,
	EXPENSE_MY_LIST_SUCCESS,
	EXPENSE_MY_LIST_FAIL,
	CREATE_NEW_EXPENSE_REQUEST,
	CREATE_NEW_EXPENSE_SUCCESS,
	CREATE_NEW_EXPENSE_FAIL,
} from '../constants/expenseConstants';

export const listMyExpenses = () => async (dispatch, getState) => {
	try {
		dispatch({ type: EXPENSE_MY_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get('/api/expenses/myexpenses', config);

		dispatch({ type: EXPENSE_MY_LIST_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: EXPENSE_MY_LIST_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const createNewExpense = (expense) => async (dispatch, getState) => {
	try {
		dispatch({ type: CREATE_NEW_EXPENSE_REQUEST });
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post('/api/expenses', expense, config);

		dispatch({ type: CREATE_NEW_EXPENSE_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: CREATE_NEW_EXPENSE_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};
