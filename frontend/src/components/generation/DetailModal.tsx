import { useState } from 'react';
import styled from '@emotion/styled';
import {
	Button,
	Container,
	IconButton,
	Modal,
	Paper,
	Typography,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DetailModalPropType, ModelType } from '../../types';
import { apiDeleteGanList, apiDownloadPkl } from '../../api';

const ModalBox = styled(Paper)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 500px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-shadow: 24;
	padding: 20px 20px 40px 20px;
	border-radius: 10px;
`;

const DeleteModalBox = styled(ModalBox)`
	width: 300px;
`;

const ImageBox = styled('div')`
	width: 400px;
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		width: 400px;
		height: 300px;
		border-radius: 5px;
	}
`;

const ButtonContainer = styled('div')`
	position: absolute;
	right: 10px;
	top: 10px;
`;

function DetailModal({ model, setTarget }: DetailModalPropType) {
	const [isUpdating, setUpdating] = useState(false);
	const [deleteTarget, setDeleteTarget] = useState<ModelType>({} as ModelType);

	const downloadPkl = async (modelId: string) => {
		try {
			const response = await apiDownloadPkl(modelId);
			console.log(response);
		} catch (e) {
			// error
		}
	};

	const deleteModel = async (modelId: string) => {
		try {
			apiDeleteGanList(modelId);
			setDeleteTarget({} as ModelType);
			setTarget({} as ModelType);
		} catch (e) {
			// error
		}
	};

	const cancelDeleteModel = () => {
		setDeleteTarget({} as ModelType);
	};

	return (
		<Modal open={Boolean(model?.id)} onClose={() => setTarget({} as ModelType)}>
			<ModalBox>
				<ImageBox>
					{model?.image ? (
						<img
							src={`http://k6s106.p.ssafy.io:8010/api/images/${model?.image}`}
							alt=''
							width='100%'
						/>
					) : (
						<Container
							sx={{
								height: 300,
								width: 400,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<ImageIcon fontSize='large' />
						</Container>
					)}
				</ImageBox>
				<Container sx={{ position: 'relative' }}>
					<Typography gutterBottom variant='h5' component='div' sx={{ margin: 2 }}>
						{model?.name}
					</Typography>
					<Typography
						variant='body2'
						color='text.secondary'
						sx={{ minHeight: 80, margin: 2 }}
					>
						{model?.description}
					</Typography>
					<ButtonContainer>
						<IconButton>
							<EditIcon color='info' />
						</IconButton>
						<IconButton onClick={() => setDeleteTarget(model)}>
							<DeleteForeverIcon color='error' />
						</IconButton>
					</ButtonContainer>
				</Container>
				<Button variant='contained' onClick={() => downloadPkl(model?.id)}>
					모델 다운로드
				</Button>
				<Modal open={Boolean(deleteTarget?.id)}>
					<DeleteModalBox>
						<Typography variant='h5'>Are you sure to delete this model?</Typography>
						<Container
							sx={{
								display: 'flex',
								marginTop: 2,
								justifyContent: 'center',
							}}
						>
							<Button
								variant='contained'
								color='error'
								sx={{ marginRight: 1 }}
								onClick={() => deleteModel(deleteTarget?.id)}
							>
								Delete
							</Button>
							<Button variant='contained' onClick={() => cancelDeleteModel()}>
								Cancel
							</Button>
						</Container>
					</DeleteModalBox>
				</Modal>
			</ModalBox>
		</Modal>
	);
}

export default DetailModal;
