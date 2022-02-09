import { useContext, useState } from 'react';
import { signupCall } from '../context/authContext/apiCalls';
import { AuthContext } from '../context/authContext/AuthContext';

export const useSignup = (setUsername, setEmail, emailRef) => {
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(null);
	const { dispatch } = useContext(AuthContext);

	const signup = async (email, username, password) => {
		setError(null);
		setIsPending(true);
		try {
			await signupCall(dispatch, email, username, password);
			setIsPending(false);
			setError(null);
		} catch (err) {
			setIsPending(false);
			if (err.response.data?.err?.keyPattern?.username === 1) {
				setError('This username is already taken. Please use another one');
			}
			setUsername('');
			if (err.response.data?.err?.keyPattern?.email === 1) {
				setError('This email is already taken. Please use another one');
				setEmail('');
			}
			emailRef.current.focus();
		}
	};

	return { error, isPending, signup };
};
