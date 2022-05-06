import { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Container, ImageList, ImageListItem } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Divider from '../components/common/Divider';
import { UploadedFileType } from '../types';

const Title = styled('span')`
	font-weight: 600;
	font-size: 48px;
`;

const MainImageContainer = styled('div')`
	height: 256px;
	width: 256px;
	margin: 30px;
	background-color: #bbbbbb;
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

	const changeMainImage = useCallback((image: UploadedFileType) => {
		setMainImage(image);
	}, []);

	const genImage = useCallback(async () => {
		try {
			// api
			const newImage = {} as UploadedFileType;
			Object.assign(newImage, {
				preview: URL.createObjectURL(newImage),
			});
			setMainImage(newImage);
			setSubImages(oldImages => oldImages.concat([newImage]));
		} catch (e) {
			// error
		}
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
				<ArrowBackIosIcon />
				<SubImageList sx={{ width: 300 }} cols={4}>
					<ImageListItem>
						<img
							src='https://phinf.pstatic.net/contact/20201125_191/1606304847351yz0f4_JPEG/KakaoTalk_20201007_183735541.jpg?type=f130_130'
							alt=''
						/>
					</ImageListItem>
					<ImageListItem>
						<img
							src='https://phinf.pstatic.net/contact/20201125_191/1606304847351yz0f4_JPEG/KakaoTalk_20201007_183735541.jpg?type=f130_130'
							alt=''
						/>
					</ImageListItem>
					<ImageListItem>
						<img
							src='https://phinf.pstatic.net/contact/20201125_191/1606304847351yz0f4_JPEG/KakaoTalk_20201007_183735541.jpg?type=f130_130'
							alt=''
						/>
					</ImageListItem>
					<ImageListItem>
						<img
							src='https://phinf.pstatic.net/contact/20201125_191/1606304847351yz0f4_JPEG/KakaoTalk_20201007_183735541.jpg?type=f130_130'
							alt=''
						/>
					</ImageListItem>
					{/* gened Image list */}
				</SubImageList>
				<ArrowForwardIosIcon />
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
					<Button variant='contained'>Get New Image</Button>
					<Button variant='contained'>Download</Button>
				</ButtonContainer>
			</Container>
		</Divider>
	);
}

export default Generation;
