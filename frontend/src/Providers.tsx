import { useState, useMemo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { PaletteMode } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PropType } from './types';
import { StateContext } from './context';

function Providers({ children }: PropType) {
	const [preferMode, setPreferMode] = useState<PaletteMode>('light');
	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: preferMode,
					primary: {
						main: '#C966E1',
					},
				},
				typography: {
					fontFamily: [
						'-apple-system',
						'BlinkMacSystemFont',
						'"Segoe UI"',
						'Roboto',
						'"Helvetica Neue"',
						'Arial',
						'sans-serif',
						'"Apple Color Emoji"',
						'"Segoe UI Emoji"',
						'"Segoe UI Symbol"',
					].join(','),
				},
			}),
		[preferMode]
	);

	const onEditMode = (mode: PaletteMode) => {
		setPreferMode(mode);
	};
	const memoized = useMemo(() => ({ theme, onEditMode }), [theme]);

	return (
		<HelmetProvider>
			<StateContext.Provider value={memoized}>
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</StateContext.Provider>
		</HelmetProvider>
	);
}

export default Providers;
