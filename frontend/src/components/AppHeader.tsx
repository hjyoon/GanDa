import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Typography, AppBar, Toolbar, Box, Button } from '@mui/material';
import ToggleColorMode from './ToggleColorMode';
import logo from '../assets/logo.png';
import logo2 from '../assets/logo2.png';

const SLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`;

function AppHeader() {
	const navigate = useNavigate();

	return (
		<AppBar position='sticky'>
			<Toolbar sx={{ height: '64px' }}>
				<Typography variant='h4' component='div' sx={{ flexGrow: 1 }}>
					<SLink to='/'>
						<img src={logo2} alt='' height='30px' />
						<img src={logo} alt='' height='30px' />
					</SLink>
				</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
					<ToggleColorMode />
					<Button sx={{ color: 'white' }} onClick={() => navigate('/generate')}>
						이미지 생성
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default AppHeader;
