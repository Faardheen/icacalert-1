import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Alert from '../containers/Alert';

const AllAlerts = ({ data: { loading, allAlerts } }) => (
  <Alert alerts={{ loading, alerts: allAlerts }} />
)

const allAlertsQuery = gql`
  query {
    allAlerts {
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

export default graphql(allAlertsQuery)(AllAlerts);