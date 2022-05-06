import { CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

function Index() {
	return (
		<>
			<CssBaseline />
			<AppHeader />
			<Outlet />
		</>
	);
}

export default Index;
