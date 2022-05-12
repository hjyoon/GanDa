import axios from 'axios';

const baseURL = `${process.env.REACT_APP_PROTOCOL}://${window.location.hostname}:${process.env.REACT_APP_PORT}/api`;
// const baseURL = 'http://k6s106.p.ssafy.io:8010/api';
const api = axios.create({
	baseURL,
});

export const apiGetGan = (dataId: string) =>
	api.get(`/gen-image/${dataId}/`, {
		responseType: 'arraybuffer',
	});

export const apiGetGanList = () => api.get('/data-list/');

export const apiTunGan = () => api.post('/');
