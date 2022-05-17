/* eslint-disable no-await-in-loop */
import axios from 'axios';
import FileSaver from 'file-saver';
import {
	CreateGanParamsType,
	UpdateGanParamsType,
	UpdatePklNameType,
} from './types';

const baseURL = `${process.env.REACT_APP_PROTOCOL}://${window.location.hostname}:${process.env.REACT_APP_PORT}/api`;
const api = axios.create({
	baseURL,
});

export const apiGetGan = (dataId: string) =>
	api.get(`/gen-image/${dataId}/`, {
		responseType: 'arraybuffer',
	});

export const apiGetGanList = () => api.get('/data-list/');

export const apiCreateGanList = ({
	name,
	description,
	formData,
}: CreateGanParamsType) =>
	api.post('/data-list/', {
		params: {
			name,
			description,
		},
		data: {
			...formData,
		},
	});

export const apiDeleteGanList = (dataId: string) =>
	api.delete(`/data-list/${dataId}/`);

export const apiUpdateGanList = ({
	dataId,
	name,
	description,
	formData,
}: UpdateGanParamsType) =>
	api.patch(`/data-list/${dataId}/?name=${name}&description=${description}`, {
		data: formData,
	});

export const apiUpdatePklName = ({ dataId, name }: UpdatePklNameType) =>
	api.patch(`/pkl/rename/${dataId}/?new_name=${name}`);

export const apiDownloadPkl = (dataId: string) =>
	api
		.get(`/pkl/download/${dataId}/`, {
			responseType: 'blob',
		})
		.then(res => FileSaver.saveAs(res.data, `${new Date().toJSON()}.pkl`));
