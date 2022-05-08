import styled from '@emotion/styled';
import {
	Container,
	ImageList,
	Button,
	Divider as ContentDivider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Divider from '../components/common/Divider';

const Wrapper = styled('div')`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: end;
	padding: 50px;
	width: 100%;
	max-width: 600px;
`;

const Title = styled('span')`
	font-weight: 700;
	font-size: 80px;
`;

const Content = styled('span')`
	font-size: 24px;
`;

const ButtonContainer = styled('div')`
	display: flex;
	justify-content: end;
	margin-top: 20px;

	button {
		margin-left: 10px;
		font-size: 24px;
		padding: 5px 40px;
	}
`;

function Main() {
	const navigate = useNavigate();
	return (
		<Divider>
			<ImageList cols={2}>{/* files */}</ImageList>
			<Container
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Wrapper>
					<Title>Gan-Da</Title>
					<ContentDivider sx={{ width: '100%', marginBottom: 2 }} />
					<Content>Have your Own Animal Image</Content>
					<Content>Get Unique Image by using GAN</Content>
					<ButtonContainer>
						<Button variant='contained' onClick={() => navigate('/generate')}>
							Generate
						</Button>
						{/* <Button variant='contained'>Do something</Button> */}
					</ButtonContainer>
				</Wrapper>
			</Container>
		</Divider>
	);
}

export default Main;
