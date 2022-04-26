import React from 'react';
import { Typography, Box } from '@mui/material';

function FirstPage() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<Typography variant='h5'>이곳은 첫 번째 페이지 입니다.</Typography>
		</Box>
	);
}

export default FirstPage;
