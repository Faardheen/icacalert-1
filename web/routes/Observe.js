import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import L from 'leaflet'
import { Map, TileLayer } from 'react-leaflet';
import styled from 'styled-components';

const PopupContent = styled.p`
  margin: 0px;
`;

const height = { height: "92vh", width: "77vw" };

let center = { lat: 0, lng: 0 };

navigator.geolocation.getCurrentPosition((position) => {
  center = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }
})

class Observe extends React.Component {
  render() {
    const { loading, allAlerts } = this.props.data
    {
      loading ? null : allAlerts.map(alert => {
        const map = this.leafletMap.leafletElement;
        const geocoder = L.Control.Geocoder.nominatim();

        const circle = L.circle([alert.lat, alert.long], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500
        }).addTo(this.leafletMap.leafletElement)
        circle.on('click', e => {
          console.log(e.latlng)
          geocoder.reverse(
            e.latlng,
            map.options.crs.scale(map.getZoom()),
            results => {
              var r = results[0];
              if (r) {
                circle.bindPopup(`
                  <PopupContent>${r.properties.address.state}</PopupContent><br>
                  <PopupContent>${alert.type}</PopupContent><br>
                  <PopupContent>${alert.user.phone}</PopupContent><br>
                  <PopupContent>${alert.description ? alert.description : "No description provided"}</PopupContent>
                `)
              }
            }
          )
        })
      })
    }
    return (
      <Map
        className='map-overview'
        style={height}
        center={center}
        zoom={13}
        ref={m => {
          this.leafletMap = m;
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    )
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
export default graphql(allAlertsQuery)(Observe);
