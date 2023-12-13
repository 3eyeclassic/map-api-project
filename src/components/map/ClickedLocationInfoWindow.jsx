import React from 'react';
import { InfoWindow as GoogleInfoWindow } from '@react-google-maps/api';

const ClickedLocationInfoWindow = ({ selectedPlace, onCloseClick }) => {
  if (!selectedPlace || !selectedPlace.geometry || !selectedPlace.geometry.location) {
    return null;
  }

  const { name = 'Unknown Place', formatted_address = '', rating = null, photos = [] } = selectedPlace;

  let position = {};
  if (selectedPlace.geometry.location.lat && selectedPlace.geometry.location.lng) {
    // If location has lat and lng properties, use them
    position = {
      lat: selectedPlace.geometry.location.lat(),
      lng: selectedPlace.geometry.location.lng(),
    };
  } else if (selectedPlace.geometry.location.toJSON && typeof selectedPlace.geometry.location.toJSON === 'function') {
    // If location has toJSON method, use it
    const location = selectedPlace.geometry.location.toJSON();
    position = {
      lat: location.lat,
      lng: location.lng,
    };
  } else {
    // Fallback to default position
    position = {
      lat: 0,
      lng: 0,
    };
  }

  return (
    <GoogleInfoWindow
      position={position}
      onCloseClick={onCloseClick}
      zIndex={1}
    >
      <div>
        <h3>{name}</h3>
        <p>Address: {formatted_address}</p>
        {rating && <p>Rating: {rating}</p>}
        {photos && photos.length > 0 && (
          <div>
            <p>Photos:</p>
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo.getUrl({ maxWidth: 100, maxHeight: 100 })}
                alt={`Photo ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </GoogleInfoWindow>
  );
};

export default ClickedLocationInfoWindow;
