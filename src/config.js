import axios from 'axios';

export const axiosInstance = axios.create({
	baseUrl: 'https://netflix-mern-clone.herokuapp.com/api/',
});
