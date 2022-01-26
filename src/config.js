import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: 'https://netflix-mern-clone.herokuapp.com/api/',
});
