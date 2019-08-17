import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Alert from '../containers/Alert';

const SortedAlert = ({ data: { loading, types } }) => (
  <Alert alerts={{ loading, alerts: types }} />
)

const typesQuery = gql`
  query($type: String) {
    types(type: $type) {
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

export default graphql(typesQuery, {
  options: (props) => ({
    variables: { type: props.match.params.type },
    options: { fetchPolicy: 'network-only' },
  }),
})(SortedAlert);