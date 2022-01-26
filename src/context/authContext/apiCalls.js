import { axiosInstance } from '../../config';

export const login = async (dispatch, user) => {
	dispatch({ type: 'LOGIN_START' });
	try {
		const res = await axiosInstance.post('auth/login', user);
		dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
	} catch (err) {
		if (err.message === 'Request failed with status code 401') {
			dispatch({
				type: 'LOGIN_FAILURE',
				payload: 'Wrong password or username',
			});
		} else {
			dispatch({ type: 'LOGIN_FAILURE', payload: 'Something went wrong' });
		}
	}
};
