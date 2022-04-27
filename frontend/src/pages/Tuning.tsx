import React from 'react';
import { Typography, Box } from '@mui/material';

function Tuning() {
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
			<Typography variant='h5'>이곳은 두 번째 페이지 입니다.</Typography>
		</Box>
	);
}

export default Tuning;
