import React from 'react';
import { Modal, Header, Card, Icon } from 'semantic-ui-react'
import { SyncLoader } from 'react-spinners';
import WrappedContent from '../components/WrappedContent';
import LeafletMap from '../components/LeafletMap';
import CardButton from '../components/CardButton';
import Spinner from '../components/Spinner';

export default ({ alerts: { loading, alerts } }) => (
  <WrappedContent>
    <h2 style={{ marginLeft: '22px' }}>{`Total Alerts Received (${loading ? 'calculating...' : alerts.length})`}</h2>
    <div className='ui grid alerts'>
      <div className='three column row alert-content'>
        {
          loading ? <Spinner className='loading'><SyncLoader /></Spinner> : alerts.map(a => (
            <div key={a.id} className='column'>
              <Card.Group className='card-layout'>
                <Card >
                  <Card.Content className='card-content'>
                    <Header as='h5'>{a.type}</Header>
                    <Card.Meta><Icon disabled name='clock outline' />&ensp;{a.timeStamp}</Card.Meta>
                    <Card.Meta><Icon disabled name='envelope open outline' />&ensp;{a.user.email}</Card.Meta>
                    <Card.Meta><Icon disabled name='map outline' />&ensp;{a.geo}</Card.Meta>
                  </Card.Content>
                  <Modal centered={false} trigger={<CardButton><Icon name='expand' /></CardButton>}>
                    <Modal.Header>Information</Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        <Header>{a.type}</Header>
                        <Modal.Description>{a.description ? a.description : <Header as='h4' color='red'>description not provided by user</Header>}</Modal.Description>
                      </Modal.Description>
                      <LeafletMap dataSet={a} />
                    </Modal.Content>
                  </Modal>
                </Card>
              </Card.Group>
            </div>
          ))
        }
      </div>
    </div>
  </WrappedContent>
)