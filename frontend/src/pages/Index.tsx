import { Container, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

function Index() {
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

export default Index;
