import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';
import { StateContext } from '../App';

export default function ToggleColorMode() {
	const { theme, onEditMode } = useContext(StateContext);

	const toggleColorMode = () => {
		onEditMode(theme.palette.mode === 'light' ? 'dark' : 'light');
	};

	return (
		<IconButton onClick={toggleColorMode} color='inherit'>
			{theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
		</IconButton>
	);
}
