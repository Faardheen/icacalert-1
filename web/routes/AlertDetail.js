import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Alert from '../containers/Alert';

const AlertDetail = ({ data: { loading, alerts } }) => (
  <Alert alerts={{ loading, alerts }} />
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
    variables: { districtName: props.match.params.districtName },
    options: { fetchPolicy: 'network-only' },
  }),
})(AlertDetail);