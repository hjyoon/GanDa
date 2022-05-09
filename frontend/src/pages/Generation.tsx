import { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
	Button,
	Container,
	IconButton,
	ImageList,
	ImageListItem,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Divider from '../components/common/Divider';
import { UploadedFileType } from '../types';
import { apiGetGan } from '../api';

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

	const changeMainImage = useCallback((image: UploadedFileType) => {
		setMainImage(image);
	}, []);

	const getImage = useCallback(async () => {
		setLoading(true);
		try {
			// api
			const response = await apiGetGan();
			console.log(response);
			const newImage = {} as UploadedFileType;
			Object.assign(newImage, {
				preview: URL.createObjectURL(newImage),
			});
			setMainImage(newImage);
			setSubImages(oldImages => oldImages.concat(newImage));
		} catch (e) {
			// error
		}
		setLoading(false);
	}, []);

	const mainContent = useMemo(
		() => (
			<MainImageContainer>
				{mainImage && <img src={mainImage.preview} alt='no img...' />}
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
		[subImages]
	);

	return (
		<Divider>
			<ImageList cols={2}>{/* model list */}</ImageList>
			<Container
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Title>Generate Images</Title>
				{mainContent}
				{subImages && subContent}
				<ButtonContainer>
					<Button variant='contained' onClick={getImage} disabled={isLoading}>
						Get New Image
					</Button>
					<Button variant='contained'>Download</Button>
				</ButtonContainer>
			</Container>
		</Divider>
	);
}

export default Generation;
