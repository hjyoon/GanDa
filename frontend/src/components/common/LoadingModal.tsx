import { CircularProgress, Modal, Paper, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { LoadingPropType } from '../../types';

const ModalBox = styled(Paper)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 300px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-shadow: 24;
	padding: 20px 20px 40px 20px;
	border-radius: 10px;
`;

function LoadingModal({ isOpen, message }: LoadingPropType) {
	return (
		<Modal open={isOpen}>
			<ModalBox>
				<Typography variant='h5' component='div' sx={{ margin: '20px' }}>
					{message}
				</Typography>
				<CircularProgress size={50} />
			</ModalBox>
		</Modal>
	);
}

export default LoadingModal;
