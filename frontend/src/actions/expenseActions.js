import axios from 'axios';
import {
	EXPENSE_MY_LIST_REQUEST,
	EXPENSE_MY_LIST_SUCCESS,
	EXPENSE_MY_LIST_FAIL,
	CREATE_NEW_EXPENSE_REQUEST,
	CREATE_NEW_EXPENSE_SUCCESS,
	CREATE_NEW_EXPENSE_FAIL,
	EXPENSE_BY_ID_REQUEST,
	EXPENSE_BY_ID_SUCCESS,
	EXPENSE_BY_ID_FAIL,
	ADD_EXPENSE_TO_LIST_REQUEST,
	ADD_EXPENSE_TO_LIST_SUCCESS,
	ADD_EXPENSE_TO_LIST_FAIL,
	DELETE_ITEM_FROM_LIST_REQUEST,
	DELETE_ITEM_FROM_LIST_SUCCESS,
	DELETE_ITEM_FROM_LIST_FAIL,
	DELETE_EXPENSE_REQUEST,
	DELETE_EXPENSE_SUCCESS,
	DELETE_EXPENSE_FAIL,
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

export const getExpenseById = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: EXPENSE_BY_ID_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/expenses/${id}`, config);

		dispatch({ type: EXPENSE_BY_ID_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: EXPENSE_BY_ID_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const addExpenseToList =
	({ id, expense }) =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ADD_EXPENSE_TO_LIST_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.put(`/api/expenses/${id}`, expense, config);

			dispatch({ type: ADD_EXPENSE_TO_LIST_SUCCESS });
		} catch (err) {
			dispatch({
				type: ADD_EXPENSE_TO_LIST_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};

export const deleteItemFromList = (idData) => async (dispatch, getState) => {
	try {
		dispatch({ type: DELETE_ITEM_FROM_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.delete(
			`/api/expenses/${idData.id}/${idData.listid}`,
			config
		);

		dispatch({ type: DELETE_ITEM_FROM_LIST_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: DELETE_ITEM_FROM_LIST_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const deleteExpense = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: DELETE_EXPENSE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.delete(`/api/expenses/${id}`, config);

		dispatch({ type: DELETE_EXPENSE_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: DELETE_EXPENSE_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};
