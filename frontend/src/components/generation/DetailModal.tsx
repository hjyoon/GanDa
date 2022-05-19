import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
	Box,
	Button,
	Container,
	IconButton,
	Modal,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { DetailModalPropType, ModelType, UploadedFileType } from '../../types';
import {
	apiDeleteGanList,
	apiDownloadPkl,
	apiUpdateGanList,
	imageURL,
} from '../../api';
import TrainImageModal from './TrainImageModal';

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
	padding: 40px;
	width: 360px;
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

function DetailModal({ model, setTarget, getGanList }: DetailModalPropType) {
	const [isUpdating, setUpdating] = useState(false);
	const [uploadedImage, setUploadedImage] = useState<UploadedFileType>(
		{} as UploadedFileType
	);
	const [deleteTarget, setDeleteTarget] = useState<ModelType>({} as ModelType);
	const [trainImageTarget, setTrainImageTarget] = useState<ModelType>(
		{} as ModelType
	);
	const { register, getValues, setValue } = useForm();
	const onDrop = useCallback((acceptedFiles: any) => {
		URL.revokeObjectURL(uploadedImage.preview || '');
		setUploadedImage(
			Object.assign(acceptedFiles[0], {
				preview: URL.createObjectURL(new Blob(acceptedFiles)),
			})
		);
	}, []);
	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		onDrop,
	});

	useEffect(() => {
		setValue('name', model.name);
		setValue('description', model.description);
		setValue('fid', model.fid);
		setValue('kimg', model.description);
	}, [isUpdating]);

	const initState = () => {
		setUpdating(false);
		setTarget({} as ModelType);
		setUploadedImage({} as UploadedFileType);
		setDeleteTarget({} as ModelType);
	};

	const updateModel = async () => {
		try {
			// api
			const formData = new FormData();
			const { name, description, fid, kimg } = getValues();
			if (uploadedImage) {
				formData.append('img', uploadedImage);
			}

			await apiUpdateGanList({
				dataId: model?.id,
				name,
				description,
				fid,
				kimg,
				formData,
			});
			initState();
			getGanList();
		} catch (e) {
			// error
		}
	};

	const downloadPkl = async (modelId: string) => {
		try {
			await apiDownloadPkl(modelId);
		} catch (e) {
			// error
		}
	};

	const deleteModel = async (modelId: string) => {
		try {
			await apiDeleteGanList(modelId);
			setDeleteTarget({} as ModelType);
			setTarget({} as ModelType);
			getGanList();
		} catch (e) {
			// error
		}
	};

	const formImage = () => {
		if (uploadedImage?.preview) {
			return <img src={uploadedImage.preview} alt='' />;
		}
		if (model?.image) {
			return <img src={`${imageURL}${model?.image}`} alt='' width='100%' />;
		}
		return (
			<Container
				sx={{
					height: 300,
					width: 400,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					border: '3px dashed skyblue',
					borderRadius: '10px',
				}}
			>
				이미지 파일을 끌어오세요.
			</Container>
		);
	};

	const updateForm = () => (
		<>
			<ImageBox {...getRootProps()}>
				<>
					<input {...getInputProps()} {...register('image')} />
					{formImage()}
				</>
			</ImageBox>
			<Box
				component='form'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'start',
					width: '100%',
				}}
				autoComplete='off'
			>
				<TextField
					{...register('name')}
					id='outlined-basic'
					label='모델 이름'
					multiline
					maxRows={1}
					sx={{ margin: 2 }}
				/>
				<Box sx={{ marginX: 2 }}>
					<TextField
						type='number'
						{...register('fid')}
						inputProps={{ max: '1000', min: '0', step: '0.01' }}
						label='FID'
						sx={{ width: '50%' }}
					/>
					<TextField
						type='number'
						{...register('kimg')}
						inputProps={{ max: '1000000', min: '1', step: '1' }}
						label='KIMG'
						sx={{ width: '50%' }}
					/>
				</Box>
				<TextField
					{...register('description')}
					id='standard-multiline-static'
					label='모델 설명'
					multiline
					rows={4}
					sx={{ margin: 2 }}
				/>
				<Button onClick={updateModel} variant='contained' sx={{ margin: 2 }}>
					수정
				</Button>
				<Button
					onClick={() => setUpdating(false)}
					variant='contained'
					color='error'
					sx={{ margin: 2 }}
				>
					취소
				</Button>
			</Box>
		</>
	);

	return (
		<Modal open={Boolean(model?.id)} onClose={initState}>
			<ModalBox>
				<>
					{isUpdating ? (
						updateForm()
					) : (
						<>
							<ImageBox>
								{model?.image ? (
									<img src={`${imageURL}${model?.image}`} alt='' width='100%' />
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
								<Typography
									gutterBottom
									variant='h5'
									component='div'
									sx={{ margin: 2 }}
								>
									{model?.name}
								</Typography>
								<Typography variant='body2' color='text.secondary' sx={{ margin: 2 }}>
									fid : {model?.fid}
								</Typography>
								<Typography variant='body2' color='text.secondary' sx={{ margin: 2 }}>
									kimg : {model?.kimg}
								</Typography>
								<Typography
									variant='body2'
									color='text.secondary'
									sx={{ minHeight: 80, margin: 2 }}
								>
									{model?.description}
								</Typography>
								<ButtonContainer>
									<IconButton onClick={() => setUpdating(true)}>
										<EditIcon color='info' />
									</IconButton>
									<IconButton onClick={() => setDeleteTarget(model)}>
										<DeleteForeverIcon color='error' />
									</IconButton>
								</ButtonContainer>
							</Container>
							<Container
								sx={{
									display: 'flex',
									width: '100%',
									justifyContent: 'center',
								}}
							>
								<Button
									variant='contained'
									onClick={() => downloadPkl(model?.id)}
									sx={{ marginRight: 2 }}
								>
									모델 다운로드
								</Button>
								<Button variant='contained' onClick={() => setTrainImageTarget(model)}>
									학습 이미지 확인
								</Button>
							</Container>
						</>
					)}
					<Modal
						open={Boolean(deleteTarget?.id)}
						onClose={() => setDeleteTarget({} as ModelType)}
					>
						<DeleteModalBox>
							<Typography variant='h6'>이 모델을 삭제하시겠습니까?</Typography>
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
								<Button
									variant='contained'
									onClick={() => setDeleteTarget({} as ModelType)}
								>
									Cancel
								</Button>
							</Container>
						</DeleteModalBox>
					</Modal>
					<Modal
						open={Boolean(trainImageTarget?.id)}
						onClose={() => setTrainImageTarget({} as ModelType)}
					>
						<ModalBox>
							<TrainImageModal target={trainImageTarget} />
						</ModalBox>
					</Modal>
				</>
			</ModalBox>
		</Modal>
	);
}

export default DetailModal;
