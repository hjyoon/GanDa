import styled from '@emotion/styled';
import {
	IconButton,
	ImageList,
	ImageListItem,
	ListSubheader,
} from '@mui/material';
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import ClearIcon from '@mui/icons-material/Clear';
import { UploadedFileType } from '../types';

const UploadContainer = styled('div')`
	width: 500px;
	height: 300px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 3px dashed #1428a0;
	border-radius: 20px;
	background-color: #1428a022;
	cursor: pointer;
	margin: 20px;
`;

const PreviewContainer = styled('div')`
	display: flex;
	flex-wrap: wrap;
	margin: 20px;
`;

function FileForm() {
	const [files, setFiles] = useState<Array<UploadedFileType>>([]);
	const onDrop = useCallback((acceptedFiles: Array<UploadedFileType>) => {
		files.forEach(file => URL.revokeObjectURL(file.preview || ''));
		setFiles(
			acceptedFiles.map(file =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			)
		);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: 'image/*',
		onDrop,
	});

	const handleDeleteFile = (file: UploadedFileType) => {
		setFiles(files.filter(e => e.preview !== file.preview));
	};

	const handleDeleteAllFiles = () => {
		setFiles([] as Array<UploadedFileType>);
	};

	return files.length === 0 ? (
		<UploadContainer {...getRootProps()}>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>이곳에 파일 혹은 폴더를 놓으세요 ...</p>
			) : (
				<>
					<p>클릭하여 파일 혹은 폴더를 선택하거나,</p>
					<p>파일 혹은 폴더를 끌어다 놓으세요.</p>
				</>
			)}
		</UploadContainer>
	) : (
		<PreviewContainer>
			<ImageList sx={{ width: 500 }} cols={3}>
				<ImageListItem key='Subheader' cols={3}>
					<ListSubheader component='div'>
						전체 삭제하고 다시 업로드
						<IconButton
							onClick={handleDeleteAllFiles}
							aria-label='delete'
							sx={{ position: 'absolute', right: 0 }}
						>
							<ClearIcon />
						</IconButton>
					</ListSubheader>
				</ImageListItem>
				{files.map(file => (
					<ImageListItem key={file.preview}>
						<IconButton
							onClick={() => handleDeleteFile(file)}
							aria-label='delete'
							sx={{ position: 'absolute', right: 0 }}
						>
							<ClearIcon />
						</IconButton>
						<img src={file.preview} alt='' />
					</ImageListItem>
				))}
			</ImageList>
		</PreviewContainer>
	);
}

export default FileForm;
