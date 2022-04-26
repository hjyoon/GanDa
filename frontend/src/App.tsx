import React, { useState, createContext, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import {
	Stack,
	Box,
	Divider,
	Container,
	CssBaseline,
	PaletteMode,
	Typography,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MyHeader from './components/MyHeader';
import Sidebar from './components/Sidebar';

export const StateContext = createContext(null);

function App() {
	const [preferMode, setPreferMode] = useState<PaletteMode>('light');
	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode: preferMode,
				},
			}),
		[preferMode]
	);

	const onEditMode = (mode: PaletteMode) => {
		setPreferMode(mode);
	};

	const memoized = useMemo(() => {
		return { theme, onEditMode };
	}, [theme]);

	return (
		<StateContext.Provider value={memoized}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<MyHeader />
				<Stack
					direction="row"
					divider={<Divider orientation="vertical" flexItem />}
				>
					<Sidebar />
					<Container>
						<Outlet />
					</Container>
				</Stack>
			</ThemeProvider>
		</StateContext.Provider>
	);
}

export default App;
