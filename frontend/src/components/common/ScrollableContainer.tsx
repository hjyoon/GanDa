import styled from '@emotion/styled';
import { Container } from '@mui/material';

const ScrollableContainer = styled(Container)`
	&::-webkit-scrollbar,
	&::-webkit-scrollbar-thumb {
		width: 30px;
		border-radius: 15px;
		border: 10px solid transparent;
	}

	&::-webkit-scrollbar-thumb {
		box-shadow: inset 0 0 0 5px;
	}

	&:hover {
		color: rgba(0, 0, 0, 0.3);
	}

	overflow: auto;
	color: rgba(0, 0, 0, 0);
	transition: color 0.3s ease;
`;

export default ScrollableContainer;
