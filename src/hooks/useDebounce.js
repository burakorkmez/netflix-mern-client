import { useState } from 'react';

const useDebounce = () => {
	const [typingTimeOut, setTypingTimeOut] = useState('');

	function debounce(func, time) {
		clearTimeout(typingTimeOut);
		const timeout = setTimeout(() => {
			func();
		}, time);

		setTypingTimeOut(timeout);
	}
	return debounce;
};

export default useDebounce;
