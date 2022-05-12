import { ReactNode } from 'react';
import { PaletteMode } from '@mui/material';
import { Theme } from '@mui/material/styles';

export interface PropType {
	children: ReactNode;
}

export interface ContextType {
	theme: Theme;
	onEditMode: (mode: PaletteMode) => void;
}

export interface UploadedFileType extends File {
	preview?: string;
}

export interface DownloadPropType {
	isShown: boolean;
	setShown: Function;
	files: Array<UploadedFileType>;
}

export interface LoadingPropType {
	isOpen: boolean;
	message: string;
}

export interface ModelValueType {
	pkl: string;
	name: string;
	image: string;
	description: string;
}

export interface ModelType extends ModelValueType {
	id: string;
}
