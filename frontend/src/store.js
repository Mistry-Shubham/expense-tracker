import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	userLoginReducer,
	userProfileReducer,
	userUpdateProfileReducer,
	userRegisterReducer,
	userPasswordResetReducer,
} from './reducers/userReducers';
import {
	expenseMyListReducer,
	expenseCreateNewReducer,
	expenseGetByIdReducer,
	expenseAddToListReducer,
	expenseDeleteItemReducer,
	expenseDeleteReducer,
	expenseEditListItemReducer,
	expenseEditReducer,
} from './reducers/expenseReducers';

const reducer = combineReducers({
	userLogin: userLoginReducer,
	userProfile: userProfileReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userRegister: userRegisterReducer,
	userPasswordReset: userPasswordResetReducer,
	expenseMyList: expenseMyListReducer,
	expenseCreateNew: expenseCreateNewReducer,
	expenseGetById: expenseGetByIdReducer,
	expenseAddToList: expenseAddToListReducer,
	expenseDeleteItem: expenseDeleteItemReducer,
	expenseDelete: expenseDeleteReducer,
	expenseEditListItem: expenseEditListItemReducer,
	expenseEdit: expenseEditReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middlewares = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
