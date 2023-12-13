import React from 'react';
import { InfoWindow as GoogleInfoWindow } from '@react-google-maps/api';

const InfoWindow = ({ selectedPlace, onCloseClick }) => {
    if (!selectedPlace || !selectedPlace.geometry || !selectedPlace.geometry.location) {
        // If selectedPlace or its properties are not defined, do not render the InfoWindow
        return null;
      }
      
  return (
    <GoogleInfoWindow
    position={{
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      }}
      onCloseClick={onCloseClick}
      zIndex={1}
    >
      <div>
        <h3>{selectedPlace.name}</h3>
        <p>Address: {selectedPlace.formatted_address}</p>
        {selectedPlace.rating && <p>Rating: {selectedPlace.rating}</p>}

        {/* Display multiple photos */}
        {selectedPlace.photos && selectedPlace.photos.length > 0 && (
          <div>
            <p>Photos:</p>
            {selectedPlace.photos.map((photo, index) => (
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

export default InfoWindow;
