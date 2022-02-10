import axios from 'axios';
import {
	EXPENSE_MY_LIST_REQUEST,
	EXPENSE_MY_LIST_SUCCESS,
	EXPENSE_MY_LIST_FAIL,
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
