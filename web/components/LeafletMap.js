import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
const height = { height: "300px", width: "300px" };

export default ({ dataSet }) => (
  <Map style={height} center={{ lat: dataSet.lat, lng: dataSet.long }} zoom={13} >
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  </Map>
)