// check if email is valid.
export const validateEmail = (email) => {
	let regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regEx.test(email);
};
