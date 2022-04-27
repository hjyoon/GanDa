import { useState } from 'react';
import { Box } from '@mui/material';
import FileForm from '../components/upload/FileForm';
import Preview from '../components/upload/Preview';
import { UploadedFileType } from '../types';

function Upload() {
	const [files, setFiles] = useState<Array<UploadedFileType>>([]);

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
			{files.length === 0 ? (
				<FileForm files={files} setFiles={setFiles} />
			) : (
				<Preview files={files} setFiles={setFiles} />
			)}
		</Box>
	);
}

export default Upload;
