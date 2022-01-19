import { createContext, useEffect, useReducer } from 'react';

const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem('user')) || null,
	isFetching: false,
	error: false,
};
export const AuthContext = createContext();

const AuthReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN_START':
			return { user: null, isFetching: true, error: false };
		case 'LOGIN_SUCCESS':
			return { user: action.payload, isFetching: false, error: false };
		case 'LOGIN_FAILURE':
			return { user: null, isFetching: false, error: true };
		case 'LOGOUT':
			return { user: null, isFetching: false, error: false };

		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(state.user));
	}, [state.user]);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
