import { axiosInstance } from '../../config';

export const login = async (dispatch, user) => {
	dispatch({ type: 'LOGIN_START' });
	try {
		const res = await axiosInstance.post('auth/login', user);
		dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
	} catch (err) {
		dispatch({ type: 'LOGIN_FAILURE' });
	}
};
