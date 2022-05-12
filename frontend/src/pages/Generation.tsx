import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Container,
	IconButton,
	ImageList,
	ImageListItem,
	Typography,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import ImageIcon from '@mui/icons-material/Image';
import Divider from '../components/common/Divider';
import { ModelType, ModelValueType, UploadedFileType } from '../types';
import { apiGetGan, apiGetGanList } from '../api';
import ScrollableContainer from '../components/common/ScrollableContainer';
import DownloadModal from '../components/DownloadModal';
import LoadingModal from '../components/common/LoadingModal';

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
							<CardMedia component='img' height='200' image={model.image} alt='' />
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
								{model.description}
							</Typography>
						</CardContent>
					</CardActionArea>
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
				<ScrollableContainer sx={{ maxHeight: 'calc(100vh  - 64px)' }}>
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
						Generate Images
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
							Get New Image
						</Button>
						<Button
							variant='contained'
							onClick={() => setModalShown(true)}
							disabled={subImages.length === 0}
						>
							Download
						</Button>
					</ButtonContainer>
				</Container>
			</Divider>
			<DownloadModal
				isShown={isModalShown}
				setShown={setModalShown}
				files={subImages}
			/>
			<LoadingModal isOpen={isLoading} message='생성 중 입니다...' />
		</>
	);
}

export default Generation;
