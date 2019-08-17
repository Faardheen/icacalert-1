import React from 'react';
import { Input } from 'semantic-ui-react';
import styled from 'styled-components';

const SearchBar = styled.div`
	padding-top: 12px;
`;

export default () => (
	<SearchBar>
		<Input fluid icon='search' placeholder='Search...' />
	</SearchBar>
);
