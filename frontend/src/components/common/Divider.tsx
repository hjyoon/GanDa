import styled from '@emotion/styled';

const Divider = styled('div')`
	display: grid;
	width: 100%;
	min-height: calc(100vh - 64px);
	grid-template-columns: 1fr 1fr;

	& > * {
		padding: 50px;
	}
`;

export default Divider;
