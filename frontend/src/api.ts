import axios from 'axios';
import FileSaver from 'file-saver';
import {
	CreateGanParamsType,
	GetGanMultipleParamsType,
	UpdateGanParamsType,
	UpdatePklNameType,
	UploadTrainImageType,
} from './types';

const baseURL = `${process.env.REACT_APP_PROTOCOL}://${window.location.hostname}:${process.env.REACT_APP_PORT}/api`;
const api = axios.create({
	baseURL,
});

export const imageURL = `${baseURL}/images/`;

export const apiGetGan = (dataId: string) =>
	api.get(`/gen-image/${dataId}/`, {
		responseType: 'arraybuffer',
	});

export const apiGetGanMultiple = ({
	dataId,
	count,
}: GetGanMultipleParamsType) =>
	api
		.get(`/gen-image/${dataId}/?count=${count}`, {
			responseType: 'blob',
		})
		.then(res => FileSaver.saveAs(res.data, `${new Date().toJSON()}.zip`));
// .then(res => console.log(res));

export const apiGetGanList = () => api.get('/data-list/');

export const apiUploadModel = (data: FormData) => api.post('/data-list/', data);

export const apiCreateGanList = ({
	name,
	description,
	fid,
	kimg,
	formData,
}: CreateGanParamsType) =>
	api.post('/data-list/', formData, {
		params: {
			name,
			description,
			fid,
			kimg,
		},
	});

export const apiDeleteGanList = (dataId: string) =>
	api.delete(`/data-list/${dataId}/`);

export const apiUpdateGanList = ({
	dataId,
	name,
	description,
	fid,
	kimg,
	formData,
}: UpdateGanParamsType) =>
	api.patch(`/data-list/${dataId}/`, formData, {
		params: {
			name,
			description,
			fid,
			kimg,
		},
	});

export const apiUpdatePklName = ({ dataId, name }: UpdatePklNameType) =>
	api.patch(`/pkl/rename/${dataId}/`, {
		params: {
			new_name: name,
		},
	});

export const apiDownloadPkl = (dataId: string) =>
	api
		.get(`/pkl/download/${dataId}/`, {
			responseType: 'blob',
		})
		.then(res => FileSaver.saveAs(res.data, `${new Date().toJSON()}.pkl`));

export const apiGetTrainImages = (dataId: string) =>
	api.get(`/train/image/${dataId}/`);

export const apiUploadTrainImage = ({
	dataId,
	formData,
}: UploadTrainImageType) => api.post(`/train/image/${dataId}/`, formData);

export const apiDeleteTrainImages = (dataId: string) =>
	api.delete(`/train/image/${dataId}/`);
