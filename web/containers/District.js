import React from 'react';
import SearchBar from '../components/SearchBar';

import styled from 'styled-components';

const DistrictList = styled.ul`
	padding-left: 0px !important;
`;

const DistrictListItem = styled.li`
	list-style-type: none;
	margin: 15px 0px;
`;

export default () => (
  <div>
    <SearchBar />
    <DistrictList>
      <DistrictListItem>
        <a href='/port+louis'><h3 className='district-header'>Port Louis</h3></a>
      </DistrictListItem>
      <DistrictListItem>
        <a href='/pamplemousses'><h3 className='district-header'>Pamplemousses</h3></a>
      </DistrictListItem>
      <DistrictListItem>
        <a href='/grand+port'><h3 className='district-header'>Grand Port</h3></a>
      </DistrictListItem>
      <DistrictListItem>
        <a href='/savanne'><h3 className='district-header'>Savanne</h3></a>
      </DistrictListItem>
      <DistrictListItem>
        <a href='/moka'><h3 className='district-header'>Moka</h3></a>
      </DistrictListItem>
      <DistrictListItem>
        <a href='/riviere+du+rempart'><h3 className='district-header'>Riviere Du Rampart</h3></a>
      </DistrictListItem>
      <DistrictListItem>
        <a href='/plaines+wilhems'><h3 className='district-header'>Plaines Wilhems</h3></a>
      </DistrictListItem>
      <DistrictListItem>
        <a href='/riviere+noire'><h3 className='district-header'>Riviere Noire</h3></a>
      </DistrictListItem>
      <DistrictListItem>
        <a href='/flacq'><h3 className='district-header'>Flacq</h3></a>
      </DistrictListItem>
    </DistrictList>
  </div>
);
