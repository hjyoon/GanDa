import React from 'react';
import { Typography, Box } from '@mui/material';

function Sidebar() {
	return (
		<Box
			sx={{
				display: 'flex',
				minWidth: 200,
				justifyContent: 'center',
				alignItems: 'center',
				padding: 1,
			}}
		>
			<Typography>이곳은 사이드 바 입니다.</Typography>
		</Box>
	);
}

export default Sidebar;
