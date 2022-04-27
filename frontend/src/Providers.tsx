import { useState, createContext, useMemo, ReactNode } from 'react';
import { PaletteMode } from '@mui/material';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { PropType } from './types';
import { StateContext } from './context';

function Providers({ children }: PropType) {
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
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</StateContext.Provider>
	);
}

export default Providers;
