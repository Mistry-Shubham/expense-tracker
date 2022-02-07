import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	userLoginReducer,
	userProfileReducer,
	userUpdateProfileReducer,
	userRegisterReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
	userLogin: userLoginReducer,
	userProfile: userProfileReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userRegister: userRegisterReducer,
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
