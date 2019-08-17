import React from 'react';
import { Header, Statistic } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react'
import { districtNameFormatter } from '../../server/utils/districtNameFormatter';

const StatsLayout = styled.div`
  padding: 20px 40px;
`;

const StatsCard = styled.div`
  background-color: white;
  text-align: center;
  padding: 40px;
  margin: 10px;
  border: 1px solid #EFEFEF;
  box-sizing: border-box;
  border-radius: 10px;
`;

const Statistics = ({ data: { loading, alerts }, districtName }) => (
  loading ? null : (
    <StatsLayout>
      <Header id='district-event-header' as='h2'>Statistics ({districtNameFormatter(districtName)})</Header>
      <div className='ui grid'>
        <div className='two column row'>
          <div id='stats-card' className='column'>
            <StatsCard>
              <Icon name='users' size='large' /> <br />
              <Statistic label='Downloads' value='5,550' />
            </StatsCard>
          </div>
          <div id='stats-card' className='column'>
            <StatsCard>
              <Icon name='warning circle' size='large' /> <br />
              <Statistic label='reported cases' value={alerts.length} />
            </StatsCard>
          </div>
        </div>
      </div>
    </StatsLayout >
  )
)

const alertsQuery = gql`
  query($districtName: String) {
    alerts(districtName: $districtName) {
      id
      type
      description
      timeStamp
      geo
      user {
        email
        phone
      }
      lat
      long
    }
  }
`

export default graphql(alertsQuery, {
  options: props => ({
    variables: { districtName: props.districtName },
    options: { fetchPolicy: 'network-only' },
  }),
})(Statistics);