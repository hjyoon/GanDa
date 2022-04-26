import { Outlet } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import AppHeader from './components/AppHeader';

function App() {
	return (
		<>
			<CssBaseline />
			<AppHeader />
			<Container>
				<Outlet />
			</Container>
		</>
	);
}

export default App;
