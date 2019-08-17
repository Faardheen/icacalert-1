import React from 'react';
import { Header, List, Button, Modal } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { SyncLoader } from 'react-spinners';
import { districtNameFormatter } from '../../server/utils/districtNameFormatter';
import { typeFormatter } from '../../server/utils/typeFormatter';
import LeafletMap from '../components/LeafletMap';
import AlertListLayout from '../components/AlertListLayout';

const AlertList = ({ data: { loading, alerts }, districtName }) => (
  <AlertListLayout id='alert-list-layout'>
    <Header id='district-event-header' as='h2'>Alerts in {districtNameFormatter(districtName)}</Header>
    <List divided relaxed>
      {
        loading ? <SyncLoader /> : alerts.map(a => (
          <List.Item key={a.id}>
            <List.Content className='list-content' floated='right'>
              <Modal centered={false} trigger={<Button size='tiny' primary>view</Button>}>
                <Modal.Header>Information</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <Header>{a.type}</Header>
                    <Modal.Description>{a.description ? a.description : <Header as='h4' color='red'>description not provided by user</Header>}</Modal.Description>
                  </Modal.Description>
                  <LeafletMap dataSet={a} />
                </Modal.Content>
              </Modal>
            </List.Content>
            <List.Content className='list-content'>
              <a href={`/alert/${districtNameFormatter(a.geo)}`}><List.Header as='h5'>{a.geo}</List.Header></a>
              <a href={`/alert/${districtNameFormatter(a.geo)}/${typeFormatter(a.type)}`}><List.Description>{a.type}</List.Description></a>
            </List.Content>
          </List.Item>
        ))
      }
    </List>
  </AlertListLayout>
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
})(AlertList);