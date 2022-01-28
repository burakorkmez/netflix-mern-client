import { axiosInstance } from '../config';

export const fetchData = async (method, url) => {
	if (method === 'GET') {
		try {
			const res = await axiosInstance.get(url, {
				headers: {
					token:
						'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
				},
			});
			return res;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
};
