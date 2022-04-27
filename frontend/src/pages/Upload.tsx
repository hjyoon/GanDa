import React from 'react';
import { Typography, Box } from '@mui/material';
import FileForm from '../components/FileForm';

function Upload() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Typography variant='h5'>
				<FileForm />
			</Typography>
		</Box>
	);
}

export default Upload;
