import styled from '@emotion/styled';
import { ImageList, ImageListItem } from '@mui/material';
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

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
	const [files, setFiles] = useState<Array<any>>([]);
	const onDrop = useCallback((acceptedFiles: Array<any>) => {
		files.forEach(file => URL.revokeObjectURL(file.preview));
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

	return (
		<>
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
			<PreviewContainer>
				<ImageList sx={{ width: 500 }} cols={3}>
					{files.map(file => (
						<ImageListItem key={file.preview}>
							<img src={file.preview} alt='' />
						</ImageListItem>
					))}
				</ImageList>
			</PreviewContainer>
		</>
	);
}

export default FileForm;
