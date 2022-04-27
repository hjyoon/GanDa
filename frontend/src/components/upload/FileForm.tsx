import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileFormPropType, UploadedFileType } from '../../types';

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

function FileForm({ files, setFiles }: FileFormPropType) {
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

	return (
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
	);
}

export default FileForm;
