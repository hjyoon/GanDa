import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import {
	Button,
	Checkbox,
	Container,
	Divider,
	FormControlLabel,
	ImageList,
	ImageListItem,
	Modal,
	Paper,
} from '@mui/material';
import { DownloadPropType, UploadedFileType } from '../types';
import ScrollableContainer from './common/ScrollableContainer';
import LoadingModal from './common/LoadingModal';

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

const Title = styled('span')`
	font-weight: 700;
	font-size: 32px;
`;

function DownloadModal({ isShown, setShown, files }: DownloadPropType) {
	const [isChecked, setChecked] = useState<Array<boolean>>(
		Array(files.length).fill(false)
	);
	const [isZipping, setZipping] = useState<boolean>(false);
	const downloadAsZipFile = useCallback(
		async (
			downloadFiles: Array<UploadedFileType>,
			downloadChecked: Array<boolean>
		) => {
			setZipping(true);

			const zip = new JSZip();
			const date = new Date().toJSON();
			const folder = zip.folder(`results ${date}`);
			let index = 0;

			downloadFiles.forEach((file, idx) => {
				if (downloadChecked[idx]) {
					folder?.file(`image${(index += 1)}.png`, file);
				}
			});
			await zip
				.generateAsync({ type: 'blob' })
				.then(res => FileSaver(res, `results ${date}.zip`));

			setZipping(false);
		},
		[]
	);

	useEffect(() => setChecked(Array(files.length).fill(false)), [files]);

	return (
		<Modal open={isShown} onClose={() => setShown(false)}>
			<ModalBox>
				<Title>다운로드</Title>
				<Divider sx={{ width: '100%', margin: '10px' }} />
				<Container>
					<FormControlLabel
						label='전체 선택'
						control={
							<Checkbox
								checked={isChecked.every(e => e)}
								indeterminate={isChecked.some(e => e) && !isChecked.every(e => e)}
								onChange={() =>
									isChecked.every(e => !e)
										? setChecked(Array(files.length).fill(true))
										: setChecked(Array(files.length).fill(false))
								}
							/>
						}
					/>
				</Container>
				<ScrollableContainer sx={{ width: 500, height: 400 }}>
					<ImageList cols={4} sx={{ paddindRight: 0 }}>
						{files.map((file, idx) => (
							<ImageListItem key={file.preview}>
								<FormControlLabel
									sx={{ position: 'absolute', left: '10px' }}
									label=''
									control={
										<Checkbox
											checked={isChecked[idx]}
											onChange={() =>
												setChecked(isChecked.map((e, i) => (i === idx ? !e : e)))
											}
										/>
									}
								/>
								<img src={file.preview} alt='' />
							</ImageListItem>
						))}
					</ImageList>
				</ScrollableContainer>
				<Button
					variant='contained'
					sx={{ width: '100%' }}
					disabled={isZipping || !isChecked.some(e => e)}
					onClick={() => downloadAsZipFile(files, isChecked)}
				>
					다운로드
				</Button>
				<LoadingModal isOpen={isZipping} message='압축 중 입니다...' />
			</ModalBox>
		</Modal>
	);
}

export default DownloadModal;
