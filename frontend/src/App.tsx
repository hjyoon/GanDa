import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import MyHeader from './components/MyHeader';

function App() {
	return (
		<>
			<MyHeader />
			<Container>
				<Outlet />
			</Container>
		</>
	);
}

export default App;
