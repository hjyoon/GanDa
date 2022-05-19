import { useState, useCallback, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { useDropzone } from 'react-dropzone';
import {
	Button,
	Divider,
	IconButton,
	ImageList,
	ImageListItem,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ModelType, UploadTrainImageModalPropType } from '../../types';
import { apiGetTrainImages, apiUploadTrainImage } from '../../api';

const Title = styled('span')`
	font-weight: 700;
	font-size: 32px;
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

function TrainImageModal({ target, setTarget }: UploadTrainImageModalPropType) {
	const [mainImage, setMainImage] = useState<string>('');
	const [subImages, setSubImages] = useState<Array<string>>([] as Array<string>);
	const [page, setPage] = useState<number>(1);
	const onDrop = useCallback(async (acceptedFiles: any) => {
		try {
			const formData = new FormData();
			for (let i = 0; i < acceptedFiles.length; i += 1) {
				formData.append('images', acceptedFiles[i]);
			}
			await apiUploadTrainImage({ dataId: target?.id, formData });
			getImages();
		} catch (e) {
			// error
		}
	}, []);
	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		onDrop,
	});

	const getImages = useCallback(async () => {
		const { data } = await apiGetTrainImages(target?.id);
		if (data.length > 0) {
			setMainImage(data[0]);
		}
		setSubImages(data);
	}, []);

	const changeMainImage = useCallback((image: string) => {
		setMainImage(image);
	}, []);

	useEffect(() => {
		if (target?.id) {
			getImages();
		}
	}, [target]);

	const mainContent = useMemo(
		() => (
			<MainImageContainer {...getRootProps()}>
				<input {...getInputProps()} />
				{mainImage && (
					<img
						src={`http://k6s106.p.ssafy.io:8010/api/images/train/${target?.id}/${mainImage}`}
						alt=''
					/>
				)}
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
				<SubImageList sx={{ width: 300, height: 68, overflow: 'hidden' }} cols={4}>
					{subImages.slice((page - 1) * 4, page * 4).map(image => (
						<Button key={image} onClick={() => changeMainImage(image)}>
							<ImageListItem>
								<img
									src={`http://k6s106.p.ssafy.io:8010/api/images/train/${target?.id}/${image}`}
									alt=''
								/>
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
			<Title>학습 이미지</Title>
			<Divider sx={{ width: '100%', margin: '10px' }} />
			{mainContent}
			{subImages && subContent}
			<Button onClick={() => setTarget({} as ModelType)}>뒤로가기</Button>
		</>
	);
}

export default TrainImageModal;
