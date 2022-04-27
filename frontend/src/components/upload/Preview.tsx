import { useCallback } from 'react';
import styled from '@emotion/styled';
import {
	Button,
	IconButton,
	ImageList,
	ImageListItem,
	ListSubheader,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { FileFormPropType, UploadedFileType } from '../../types';

const PreviewContainer = styled('div')`
	display: flex;
	flex-wrap: wrap;
	margin: 20px;
`;

function Preview({ files, setFiles }: FileFormPropType) {
	const handleDeleteFile = useCallback((file: UploadedFileType) => {
		setFiles((targetFiles: Array<UploadedFileType>) =>
			targetFiles.filter(e => e.preview !== file.preview)
		);
	}, []);

	const handleDeleteAllFiles = useCallback(() => {
		setFiles([] as Array<UploadedFileType>);
	}, []);

	const handleSubmit = () => {
		// api
	};

	return (
		<PreviewContainer>
			<ImageList sx={{ width: 500 }} cols={3}>
				{/* <Button variant='contained'>이미지 추가</Button> */}
				{/* <Button variant='contained' color='error'>이미지 삭제</Button> */}
				<Button variant='contained' onClick={handleSubmit}>
					이미지 생성
				</Button>
				<ImageListItem key='Subheader' cols={3}>
					<ListSubheader component='div'>
						전체 삭제하고 다시 업로드
						<IconButton
							onClick={handleDeleteAllFiles}
							aria-label='delete'
							color='error'
							sx={{ position: 'absolute', right: 0 }}
						>
							<ClearIcon />
						</IconButton>
					</ListSubheader>
				</ImageListItem>
				{files.map(file => (
					<ImageListItem key={file.preview}>
						<IconButton
							onClick={() => handleDeleteFile(file)}
							color='error'
							aria-label='delete'
							sx={{ position: 'absolute', right: 0 }}
						>
							<ClearIcon />
						</IconButton>
						<img src={file.preview} alt='' />
					</ImageListItem>
				))}
			</ImageList>
		</PreviewContainer>
	);
}

export default Preview;
