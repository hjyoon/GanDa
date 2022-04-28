import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
	Button,
	CircularProgress,
	ImageList,
	ImageListItem,
	Modal,
	Paper,
} from '@mui/material';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import { ResultPropType } from '../../types';

const PreviewContainer = styled('div')`
	display: flex;
	flex-wrap: wrap;
	margin: 20px;
`;

const ModalBox = styled(Paper)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 400;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-shadow: 24;
	padding: 20px;
	border-radius: 10px;
`;

function Result({ files, uploadState, setUploadState }: ResultPropType) {
	const [isZipping, setZipping] = useState<boolean>(false);
	const downloadAsZipFile = async () => {
		setZipping(true);

		const zip = new JSZip();
		const date = new Date().toJSON();
		const folder = zip.folder(`results ${date}`);

		files.forEach((file, idx) => folder?.file(`image${idx}.jpg`, file));
		await zip
			.generateAsync({ type: 'blob' })
			.then(res => FileSaver(res, `results ${date}.zip`));

		setZipping(false);
	};
	const contents = useMemo(() => {
		if (uploadState === 'generating') {
			return (
				<>
					<CircularProgress size={100} />
					<p>이미지 생성 중 입니다. 잠시만 기다려 주세요.</p>
				</>
			);
		}
		if (uploadState === 'generated') {
			return (
				<>
					<Button variant='contained' onClick={() => setUploadState('upload')}>
						돌아가기
					</Button>
					<Button onClick={() => downloadAsZipFile()}>다운로드</Button>
					<PreviewContainer>
						<ImageList sx={{ width: 500 }} cols={3}>
							{files.map((file: any) => (
								<ImageListItem key={file.preview}>
									<img src={file.preview} alt='' />
								</ImageListItem>
							))}
						</ImageList>
					</PreviewContainer>
					<Modal open={isZipping}>
						<ModalBox>
							<p>파일 압축 중...</p>
							<CircularProgress size={50} />
						</ModalBox>
					</Modal>
				</>
			);
		}
		return null;
	}, [uploadState, isZipping]);

	return contents;
}

export default Result;
