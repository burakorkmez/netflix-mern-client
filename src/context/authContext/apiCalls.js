import axios from 'axios';

export const login = async (dispatch, user) => {
	dispatch({ type: 'LOGIN_START' });
	try {
		const res = await axios.post('auth/login', user);
		dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
	} catch (err) {
		dispatch({ type: 'LOGIN_FAILURE' });
	}
};
