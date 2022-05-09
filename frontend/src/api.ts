import axios from 'axios';

const baseURL = `${process.env.REACT_APP_PROTOCOL}://${window.location.hostname}:${process.env.REACT_APP_PORT}`;
const api = axios.create({
	baseURL,
});

export const apiGetGan = () => api.post('/upload/file2/');

export const apiTunGan = () => api.post('/');
