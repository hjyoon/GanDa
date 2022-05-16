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
import { apiDeleteGanList, apiDownloadPkl, apiUpdateGanList } from '../../api';

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
	const [uploadedImage, setUploadedImage] = useState<UploadedFileType>(
		{} as UploadedFileType
	);
	const [deleteTarget, setDeleteTarget] = useState<ModelType>({} as ModelType);
	const { register, getValues } = useForm();
	const onDrop = useCallback((acceptedFiles: any) => {
		URL.revokeObjectURL(uploadedImage.preview || '');
		setUploadedImage(
			Object.assign(acceptedFiles, {
				preview: URL.createObjectURL(new Blob(acceptedFiles)),
			})
		);
	}, []);
	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		onDrop,
	});

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
			const { name, description, image } = getValues();
			formData.append('image', image[0]);
			formData.append('enctype', 'multipart/form-data');
			const response = await apiUpdateGanList({
				dataId: model?.id,
				name,
				description,
				formData,
			});
			console.log(response);
			// change model
		} catch (e) {
			// error
		}
	};

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

	const formImage = () => {
		if (uploadedImage?.preview) {
			return <img src={uploadedImage.preview} alt='' />;
		}
		if (model?.image) {
			return (
				<img
					src={`http://k6s106.p.ssafy.io:8010/api/images/${model?.image}`}
					alt=''
					width='100%'
				/>
			);
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
					id='standard-multiline-flexible'
					label='Name'
					multiline
					maxRows={4}
					defaultValue={model?.name}
					sx={{ margin: 2 }}
				/>
				<TextField
					{...register('description')}
					id='standard-multiline-static'
					label='Description'
					multiline
					rows={4}
					defaultValue={model?.description}
					sx={{ margin: 2 }}
				/>
				<Button onClick={updateModel} variant='contained' sx={{ margin: 2 }}>
					Submit
				</Button>
				<Button
					onClick={() => setUpdating(false)}
					variant='contained'
					color='error'
					sx={{ margin: 2 }}
				>
					Cancel
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
								<Typography
									gutterBottom
									variant='h5'
									component='div'
									sx={{ margin: 2 }}
								>
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
									<IconButton onClick={() => setUpdating(true)}>
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
						</>
					)}
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
								<Button
									variant='contained'
									onClick={() => setDeleteTarget({} as ModelType)}
								>
									Cancel
								</Button>
							</Container>
						</DeleteModalBox>
					</Modal>
				</>
			</ModalBox>
		</Modal>
	);
}

export default DetailModal;
