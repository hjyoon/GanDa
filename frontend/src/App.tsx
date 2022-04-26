import React, { useState, createContext, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, CssBaseline, PaletteMode } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MyHeader from './components/MyHeader';

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
				<Container>
					<Outlet />
				</Container>
			</ThemeProvider>
		</StateContext.Provider>
	);
}

export default App;
