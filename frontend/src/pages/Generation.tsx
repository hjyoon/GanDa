import { useCallback, useMemo, useState } from 'react';
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
import Divider from '../components/common/Divider';
import { UploadedFileType } from '../types';
import { apiGetGan } from '../api';
import sample from '../assets/sample';
import ScrollableContainer from '../components/common/ScrollableContainer';
import DownloadModal from '../components/DownloadModal';
import LoadingModal from '../components/common/LoadingModal';

const Title = styled('span')`
	font-weight: 600;
	font-size: 48px;
`;

const MainImageContainer = styled('div')`
	height: 256px;
	width: 256px;
	margin: 30px;
	background-color: #ddd;
	border: 1px solid black;

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
	border: 1px solid black;
	width: 72px;
	height: 72px;
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
	const [mainImage, setMainImage] = useState<UploadedFileType>();
	const [subImages, setSubImages] = useState<Array<UploadedFileType>>([]);
	const [page, setPage] = useState<number>(1);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [isModalShown, setModalShown] = useState<boolean>(false);

	const init = useCallback(() => {
		setMainImage({} as UploadedFileType);
		setSubImages([] as Array<UploadedFileType>);
		setPage(1);
	}, []);

	const changeMainImage = useCallback((image: UploadedFileType) => {
		setMainImage(image);
	}, []);

	const getImage = useCallback(async () => {
		setLoading(true);
		try {
			// api
			const { data } = await apiGetGan('1');
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

	const mainContent = useMemo(
		() => (
			<MainImageContainer>
				{mainImage && <img src={mainImage.preview} alt='' />}
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
				<SubImageList sx={{ width: 300 }} cols={4}>
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
					<ImageList cols={3} gap={8}>
						{sample.map(img => (
							<Card key={img}>
								<CardActionArea>
									<CardMedia component='img' height='200' image={img} alt='' />
									<CardContent>
										<Typography gutterBottom variant='h5' component='div'>
											Lorem
										</Typography>
										<Typography variant='body2' color='text.secondary'>
											Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						))}
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
						Generate Images
						<IconButton onClick={init} title='목록 초기화'>
							<LayersClearIcon />
						</IconButton>
					</Title>
					{mainContent}
					{subImages && subContent}
					<ButtonContainer>
						<Button variant='contained' onClick={getImage} disabled={isLoading}>
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
