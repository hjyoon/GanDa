import { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from '@emotion/styled';
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	ImageList,
	ImageListItem,
	Stack,
	Typography,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import ImageIcon from '@mui/icons-material/Image';
import Divider from '../components/common/Divider';
import { ModelType, ModelValueType, UploadedFileType } from '../types';
import { apiGetGan, apiGetGanList, apiUploadModel } from '../api';
import ScrollableContainer from '../components/common/ScrollableContainer';
import DownloadModal from '../components/DownloadModal';
import LoadingModal from '../components/common/LoadingModal';
import DetailModal from '../components/generation/DetailModal';

const ModelCard = styled(Card)`
	opacity: 0.5;
	&.selected {
		box-shadow: 0px 4px 2px -2px rgb(0 0 0 / 50%),
			0px 2px 2px 0px rgb(0 0 0 / 28%), 0px 2px 6px 0px rgb(0 0 0 / 24%);
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
	const [isLoading, setLoading] = useState<boolean>(false);
	const [isModalShown, setModalShown] = useState<boolean>(false);
<<<<<<< HEAD
	const [targetModel, setTargetModel] = useState<ModelType>({} as ModelType);
=======
	const [isUploadModalShown, setUploadModalShown] = useState<boolean>(false);
	const [pklSelected, setPklSelected] = useState<File>();
	const [imgSelected, setImgSelected] = useState<File>();

	const handleImage = (value: File) => {
		setImgSelected(value);
	};

	const handlePklModify = async () => {
		setLoading(true);
		try {
			const formData = new FormData();
			if (imgSelected) {
				formData.append('img', imgSelected, imgSelected.name);
			}
			if (pklSelected) {
				formData.append('pkl_file', pklSelected, pklSelected.name);
				await apiUploadModel(formData);
				window.location.reload();
			}
		} catch (error) {
			console.dir(error);
		}
		setLoading(false);
		setUploadModalShown(false);
	};

	const handlePkl = (value: File) => {
		setPklSelected(value);
	};

	const handleUploadModalClose = () => {
		setUploadModalShown(false);
	};
>>>>>>> 58fc55e (Add uploading .pkl file)

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
		setLoading(true);
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
		setLoading(false);
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
								image={`http://k6s106.p.ssafy.io:8010/api/images/${model.image}`}
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
<<<<<<< HEAD
						<Button onClick={() => setTargetModel(model)}>상세정보</Button>
=======
						<Button>Detail</Button>
>>>>>>> 605235c (feat #S06P31S106-117 : set api)
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

	return (
		<>
			<Divider>
				<Helmet>
					<title>이미지 생성 | GanDa</title>
				</Helmet>
				<ScrollableContainer sx={{ maxHeight: 'calc(100vh  - 64px)' }}>
					<Button variant='contained' onClick={() => setUploadModalShown(true)}>
						pkl 업로드
					</Button>
					<ImageList cols={2}>{modelList}</ImageList>
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
							disabled={isLoading}
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
			<Dialog open={isUploadModalShown} onClose={handleUploadModalClose}>
				<DialogTitle>pkl 업로드</DialogTitle>
				<DialogContent>
					<Stack spacing={2}>
						<Typography variant='subtitle1'>이미지(선택)</Typography>
						<input
							type='file'
							accept='image/*'
							onChange={e => {
								const fileList = e.target.files;
								if (!fileList) return;
								handleImage(fileList[0]);
							}}
						/>
						<Typography variant='subtitle1'>pkl 파일(필수)</Typography>
						<input
							type='file'
							accept='.pkl'
							onChange={e => {
								const fileList = e.target.files;
								if (!fileList) return;
								handlePkl(fileList[0]);
							}}
						/>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button size='small' onClick={handleUploadModalClose}>
						Cancel
					</Button>
					<Button size='small' variant='contained' onClick={handlePklModify}>
						OK
					</Button>
				</DialogActions>
			</Dialog>
			<DownloadModal
				isShown={isModalShown}
				setShown={setModalShown}
				files={subImages}
			/>
<<<<<<< HEAD
			<LoadingModal isOpen={isLoading} message='생성 중 입니다...' />
			<DetailModal
				model={targetModel}
				setTarget={setTargetModel}
				getGanList={getGanList}
			/>
=======
			<LoadingModal isOpen={isLoading} message='작업 중 입니다...' />
>>>>>>> 58fc55e (Add uploading .pkl file)
		</>
	);
}

export default Generation;
