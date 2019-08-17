import React from 'react';

import AlertList from '../containers/AlertList';
import Statistics from '../containers/Statistics';

export default ({ match: { params: { districtName } } }) => (
  <div className='ui grid'>
    <div className='sixteen wide row column'>
      <div id='district-event-layout alert-list' className='six wide column'>
        <AlertList districtName={districtName} />
      </div>
      <div id='district-event-layout statistics-list' className='ten wide column'>
        <Statistics id='statistics' districtName={districtName} />
      </div>
    </div>
  </div>
)