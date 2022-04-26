import { CssBaseline, Typography, Container, Box, Button } from '@mui/material';

function App() {
	return (
		<>
			<CssBaseline />
			<Container>
				<Box
					sx={{
						display: 'flex',
						height: '100vh',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography variant='h4'>Hello World</Typography>
				</Box>
			</Container>
		</>
	);
}

export default App;
