import { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import {
	Button,
	Box,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	Dialog,
	DialogContent,
	IconButton,
	ImageList,
	ImageListItem,
	TextField,
	Typography,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import ImageIcon from '@mui/icons-material/Image';
import Divider from '../components/common/Divider';
import { ModelType, ModelValueType, UploadedFileType } from '../types';
import {
	apiCreateGanList,
	apiGetGan,
	apiGetGanList,
	apiUploadModel,
	imageURL,
} from '../api';
import ScrollableContainer from '../components/common/ScrollableContainer';
import DownloadModal from '../components/DownloadModal';
import LoadingModal from '../components/common/LoadingModal';
import DetailModal from '../components/generation/DetailModal';

const ModelCard = styled(Card)`
	opacity: 0.5;
	&.selected {
		box-shadow: 2px 4px 4px -4px rgb(0 0 0 / 50%),
			0px 4px 4px 2px rgb(0 0 0 / 28%), 0px 4px 6px 6px rgb(0 0 0 / 24%);
		opacity: 1;
	}
	transition: opacity 1s border 1s;
`;

const Title = styled('span')`
	font-weight: 600;
	font-size: 48px;
`;

const MainImageContainer = styled('div')`
	height: 256px;
	width: 256px;
	margin: 30px;
	background-color: #ddd;

	img {
		height: 256px;
		width: 256px;
	}
`;

const SubImageContainer = styled('div')`
	display: flex;
	align-items: center;
`;

const SubImageList = styled(ImageList)`
	margin: 10px;
`;

const SubDummy = styled('div')`
	background-color: #ddd;
	width: 56px;
	height: 56px;
	margin: 6px 8px;
`;

const ImageBox = styled('div')`
	width: 400px;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		width: 400px;
		height: 200px;
		border-radius: 5px;
	}
`;

const ButtonContainer = styled('div')`
	display: flex;
	flex-direction: column;

	button {
		margin-top: 20px;
		width: 300px;
	}
`;

function Generation() {
	const [currentModel, setCurrentModel] = useState<ModelType>({} as ModelType);
	const [Models, setModels] = useState<Array<ModelType>>([] as Array<ModelType>);
	const [mainImage, setMainImage] = useState<UploadedFileType>();
	const [subImages, setSubImages] = useState<Array<UploadedFileType>>([]);
	const [page, setPage] = useState<number>(1);
	const [isUploading, setUploading] = useState<boolean>(false);
	const [isGenerating, setGenerating] = useState<boolean>(false);
	const [isModalShown, setModalShown] = useState<boolean>(false);
	const [isUploadModalShown, setUploadModalShown] = useState<boolean>(false);
	const [uploadedImage, setUploadedImage] = useState<UploadedFileType>(
		{} as UploadedFileType
	);
	const [pklSelected, setPklSelected] = useState<File>();
	const onDrop = useCallback((acceptedFiles: any) => {
		URL.revokeObjectURL(uploadedImage.preview || '');
		setUploadedImage(
			Object.assign(acceptedFiles[0], {
				preview: URL.createObjectURL(new Blob(acceptedFiles)),
			})
		);
	}, []);
	const { register, getValues, setValue } = useForm();
	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		onDrop,
	});

	const handlePklModify = async () => {
		setUploading(true);
		try {
			const { name, description, fid, kimg } = getValues();
			const formData = new FormData();
			if (uploadedImage) {
				formData.append('img', uploadedImage, uploadedImage.name);
			}
			if (pklSelected) {
				formData.append('pkl_file', pklSelected, pklSelected.name);
				await apiCreateGanList({ name, description, fid, kimg, formData });
				// window.location.reload();
				handleUploadModalClose();
				getGanList();
			}
		} catch (error) {
			// console.dir(error);
		}
		setUploading(false);
		setUploadModalShown(false);
	};

	const handlePkl = (value: File) => {
		setPklSelected(value);
	};

	const handleUploadModalClose = () => {
		setValue('name', '');
		setValue('description', '');
		setValue('fid', null);
		setValue('kimg', null);
		setPklSelected({} as File);
		setUploadedImage({} as UploadedFileType);
		setUploadModalShown(false);
	};
	const [targetModel, setTargetModel] = useState<ModelType>({} as ModelType);

	const changeCurrentModel = useCallback((Model: ModelType) => {
		setCurrentModel(Model);
	}, []);

	const getGanList = useCallback(async () => {
		try {
			const { data } = await apiGetGanList();
			setModels(
				Object.keys(data).map((id: string, idx: number) => {
					const Model = { id, ...(data[id] as ModelValueType) } as ModelType;
					if (idx === 0) {
						setCurrentModel(Model);
					}
					return Model;
				})
			);
		} catch (e) {
			// error
		}
	}, []);

	useEffect(() => {
		getGanList();
	}, []);

	const initImages = useCallback(() => {
		setMainImage({} as UploadedFileType);
		setSubImages([] as Array<UploadedFileType>);
		setPage(1);
	}, []);

	const changeMainImage = useCallback((image: UploadedFileType) => {
		setMainImage(image);
	}, []);

	const getImage = useCallback(async (Model: string) => {
		setGenerating(true);
		try {
			// api
			const { data } = await apiGetGan(Model);
			const file = new File([data], '');
			Object.assign(file, {
				preview: URL.createObjectURL(file),
			});
			setMainImage(file);
			setSubImages(oldImages => {
				setPage(Math.ceil((oldImages.length + 1) / 4));
				return oldImages.concat(file);
			});
		} catch (e) {
			// error
		}
		setGenerating(false);
	}, []);

	const modelList = useMemo(
		() =>
			Models.map((model: ModelType) => (
				<ModelCard
					key={model.id}
					sx={{ margin: '2px' }}
					className={currentModel.id === model.id ? 'selected' : ''}
				>
					<CardActionArea onClick={() => changeCurrentModel(model)}>
						{model.image ? (
							<CardMedia
								component='img'
								height='200'
								image={`${imageURL}${model.image}`}
								alt=''
							/>
						) : (
							<Container
								sx={{
									height: 200,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									borderBottom: '1px solid grey',
								}}
							>
								<ImageIcon fontSize='large' />
							</Container>
						)}
						<CardContent>
							<Typography gutterBottom variant='h6' component='div'>
								{model.name}
							</Typography>
							<Typography variant='body2' color='text.secondary'>
								{model.description || '...'}
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button onClick={() => setTargetModel(model)}>상세정보</Button>
					</CardActions>
				</ModelCard>
			)),
		[currentModel, Models]
	);

	const mainContent = useMemo(
		() => (
			<MainImageContainer>
				{mainImage?.preview && <img src={mainImage.preview} alt='' />}
			</MainImageContainer>
		),
		[mainImage]
	);

	const subContent = useMemo(
		() => (
			<SubImageContainer>
				<IconButton onClick={() => setPage(page - 1)} disabled={page <= 1}>
					<ArrowBackIosNewIcon />
				</IconButton>
				<SubImageList sx={{ width: 300, height: 68 }} cols={4}>
					{subImages.slice((page - 1) * 4, page * 4).map(file => (
						<Button key={file.preview} onClick={() => changeMainImage(file)}>
							<ImageListItem>
								<img src={file.preview} alt='' />
							</ImageListItem>
						</Button>
					))}
					{page * 4 > subImages.length &&
						Array(page * 4 - subImages.length)
							.fill(null)
							.map(_ => (
								<ImageListItem key={Math.random()}>
									<SubDummy />
								</ImageListItem>
							))}
				</SubImageList>
				<IconButton
					onClick={() => setPage(page + 1)}
					disabled={page >= Math.ceil(subImages.length / 4)}
				>
					<ArrowForwardIosIcon />
				</IconButton>
			</SubImageContainer>
		),
		[subImages, page]
	);

	const formImage = () => {
		if (uploadedImage?.preview) {
			return <img src={uploadedImage.preview} alt='' />;
		}
		return (
			<Container
				sx={{
					height: 200,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					border: '3px dashed skyblue',
					borderRadius: '10px',
					marginX: 2,
				}}
			>
				이미지 파일을 끌어오세요.
			</Container>
		);
	};

	const uploadForm = useMemo(
		() => (
			<Dialog open={isUploadModalShown} onClose={handleUploadModalClose}>
				<DialogContent>
					<ImageBox {...getRootProps()}>
						<input {...getInputProps()} {...register('image')} />
						{formImage()}
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
						<Button variant='contained' component='label' sx={{ marginX: 2 }}>
							{pklSelected?.name ? pklSelected?.name : 'pkl 파일 업로드'}
							<input
								name='pkl'
								type='file'
								accept='.pkl'
								hidden
								onChange={e => {
									const fileList = e.target.files;
									if (!fileList) return;
									handlePkl(fileList[0]);
								}}
							/>
						</Button>
						<Button onClick={handlePklModify} variant='contained' sx={{ margin: 2 }}>
							업로드
						</Button>
						<Button
							onClick={handleUploadModalClose}
							variant='contained'
							color='error'
							sx={{ margin: 2 }}
						>
							취소
						</Button>
					</Box>
				</DialogContent>
			</Dialog>
		),
		[isUploadModalShown, uploadedImage, pklSelected]
	);

	return (
		<>
			<Helmet>
				<title>이미지 생성 | GanDa</title>
			</Helmet>
			<Divider>
				<ScrollableContainer sx={{ maxHeight: 'calc(100vh  - 64px)' }}>
					<Button variant='contained' onClick={() => setUploadModalShown(true)}>
						모델 업로드
					</Button>
					<ImageList cols={2} sx={{ padding: 1 }}>
						{modelList}
					</ImageList>
				</ScrollableContainer>
				<Container
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Title>
						이미지 생성
						<IconButton onClick={initImages} title='목록 초기화'>
							<LayersClearIcon />
						</IconButton>
					</Title>
					{mainContent}
					{subImages && subContent}
					<ButtonContainer>
						<Button
							variant='contained'
							onClick={() => getImage(currentModel.id)}
							disabled={isGenerating}
						>
							생성 하기
						</Button>
						<Button
							variant='contained'
							onClick={() => setModalShown(true)}
							disabled={subImages.length === 0}
						>
							다운로드
						</Button>
					</ButtonContainer>
				</Container>
			</Divider>
			{uploadForm}
			<DownloadModal
				isShown={isModalShown}
				setShown={setModalShown}
				files={subImages}
			/>
			<LoadingModal isOpen={isUploading} message='작업 중 입니다...' />
			<LoadingModal isOpen={isGenerating} message='생성 중 입니다...' />
			<DetailModal
				model={targetModel}
				setTarget={setTargetModel}
				getGanList={getGanList}
			/>
		</>
	);
}

export default Generation;
