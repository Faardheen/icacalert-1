import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Map extends React.Component {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(p => {
      this.setState({
        lat: p.coords.latitude,
        lng: p.coords.longitude
      })
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0
    }
  }
  render() {
    const { loading, allAlerts } = this.props.data
    const { lat, lng } = this.state;
    return (
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: this.state.lat,
          longitude: this.state.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: lat, longitude: lng }}
          image={require('../../assets/pin.png')}
          title='(You)'
          description='Hello!'
        />
        {
          loading ? null : allAlerts.map(a => (
            <Marker
              key={a.id}
              coordinate={{ latitude: a.lat, longitude: a.long }}
              image={require('../../assets/pinactive.png')}
              title={a.type}
            />
          ))
        }
      </MapView>
    );
  }
}

const allAlertsQuery = gql`
  query {
    allAlerts {
      id
      type
      description
      user {
        email
        phone
      }
      lat
      long
    }
  }
`

export default graphql(allAlertsQuery)(Map);