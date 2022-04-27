import React from 'react';
import { Box, Button } from '@mui/material';
import FileForm from '../components/FileForm';

function Upload() {
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
			<FileForm />
			<Button variant='contained'>이미지 업로드</Button>
		</Box>
	);
}

export default Upload;
