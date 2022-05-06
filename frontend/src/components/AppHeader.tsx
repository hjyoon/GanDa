import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import {
	Typography,
	AppBar,
	Toolbar,
	Box,
	Button,
	IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';

const SLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`;

function AppHeader() {
	const navigate = useNavigate();

	return (
		<AppBar position='sticky'>
			<Toolbar variant='dense'>
				{/* <IconButton
					size='large'
					edge='start'
					color='inherit'
					aria-label='menu'
					sx={{ mr: 2 }}
				>
					<MenuIcon />
				</IconButton> */}
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					<SLink to='/'>GanD</SLink>
				</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
					<ToggleColorMode />
					<Button sx={{ color: 'white' }} onClick={() => navigate('/generate')}>
						UPLOAD
					</Button>
					<Button sx={{ color: 'white' }} onClick={() => navigate('/tuning')}>
						TUNING
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default AppHeader;
