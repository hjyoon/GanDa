import { useState, createContext, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, CssBaseline, PaletteMode } from '@mui/material';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import AppHeader from './components/AppHeader';

interface ContextType {
	theme: Theme;
	onEditMode: (mode: PaletteMode) => void;
}

export const StateContext = createContext<ContextType>({} as ContextType);

function App() {
	const [preferMode, setPreferMode] = useState<PaletteMode>('light');
	const theme = useMemo(
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

	const memoized = useMemo(() => ({ theme, onEditMode }), [theme]);

	return (
		<StateContext.Provider value={memoized}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppHeader />
				<Container>
					<Outlet />
				</Container>
			</ThemeProvider>
		</StateContext.Provider>
	);
}

export default App;
