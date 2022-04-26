import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Typography,
	AppBar,
	Toolbar,
	Box,
	Button,
	IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function AppHeader() {
	const navigate = useNavigate();

	return (
		<AppBar position='sticky'>
			<Toolbar variant='dense'>
				<IconButton
					size='large'
					edge='start'
					color='inherit'
					aria-label='menu'
					sx={{ mr: 2 }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					App
				</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
					<Button sx={{ color: 'white' }} onClick={() => navigate('/first')}>
						PAGE 1
					</Button>
					<Button sx={{ color: 'white' }} onClick={() => navigate('/second')}>
						PAGE 2
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default AppHeader;
