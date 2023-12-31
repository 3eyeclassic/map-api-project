import React from 'react';
import { Marker } from '@react-google-maps/api';

const MapMarker = ({ position, label }) => {
  return (
    <Marker
      position={position}
      label={label}
    />
  );
};

export default MapMarker;
