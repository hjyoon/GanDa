import { useMemo } from 'react';
import styled from '@emotion/styled';
import {
	Button,
	CircularProgress,
	ImageList,
	ImageListItem,
} from '@mui/material';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import { ResultPropType } from '../../types';

const PreviewContainer = styled('div')`
	display: flex;
	flex-wrap: wrap;
	margin: 20px;
`;

function Result({ files, uploadState, setUploadState }: ResultPropType) {
	const downLoadAsZipFile = () => {
		const zip = new JSZip();
		const folder = zip.folder('images');
		files.forEach((file, idx) => folder?.file(`image${idx}.jpg`, file));
		zip
			.generateAsync({ type: 'blob' })
			.then(res => FileSaver(res, 'results.zip'));
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
					<Button onClick={() => downLoadAsZipFile()}>Down</Button>
					<PreviewContainer>
						<ImageList sx={{ width: 500 }} cols={3}>
							{files.map((file: any) => (
								<ImageListItem key={file.preview}>
									<img src={file.preview} alt='' />
								</ImageListItem>
							))}
						</ImageList>
					</PreviewContainer>
				</>
			);
		}
		return null;
	}, [uploadState]);

	return contents;
}

export default Result;
