import axios from 'axios';

const baseURL = 'http://localhost:3000';
const api = axios.create({
	baseURL,
});

export const apiGetGan = () => api.post('/');

export const apiTunGan = () => api.post('/');
