import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { UploadedFileType } from '../types';
import FileForm from '../components/upload/FileForm';
import Preview from '../components/upload/Preview';
import Result from '../components/upload/Result';

function Upload() {
	const [files, setFiles] = useState<Array<UploadedFileType>>([]);
	const [uploadState, setUploadState] = useState<string>('upload');

	const contents = useMemo(() => {
		if (uploadState === 'upload') {
			return (
				<FileForm
					files={files}
					setFiles={setFiles}
					setUploadState={setUploadState}
				/>
			);
		}
		if (uploadState === 'uploaded') {
			return (
				<Preview
					files={files}
					setFiles={setFiles}
					setUploadState={setUploadState}
				/>
			);
		}
		return (
			<Result
				files={files}
				uploadState={uploadState}
				setUploadState={setUploadState}
			/>
		);
	}, [uploadState, files]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '90vh',
			}}
		>
			{contents}
		</Box>
	);
}

export default Upload;
