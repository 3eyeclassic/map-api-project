import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import SearchBox from './StandaloneSearchBox ';
import MapMarker from './MapMarker';

const container = {
  width: "75%",
  height: "500px"
};

const position = {
  lat: 35.680959106959,
  lng: 139.76730676352
};

const libraries = ['places'];

function Map() {
  const searchBoxRef = useRef(null);
  const mapRef = useRef(null);

  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleLoad = (searchBox, map) => {
    searchBoxRef.current = searchBox;
    mapRef.current = map;
  };

  const handlePlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();

      // Places 配列をコンソール上に表示
      console.log('Places:', places);
      
      if (places && places.length > 0) {
        const selectedPlace = places[0];
        setSelectedPlace(selectedPlace);

        const latitude = selectedPlace.geometry.location.lat();
        const longitude = selectedPlace.geometry.location.lng();

        const newCenter = {
          lat: latitude,
          lng: longitude,
        };

        if (mapRef.current) {
          mapRef.current.panTo(newCenter);
        }
      }
    }
  };

  return (
    <>
      <h1>React & Google Map</h1>
      <div className='wrap'>
        <LoadScript googleMapsApiKey='AIzaSyDdBqvRgX8FtQI1CSFntBAnjWYW3tXUnyc' libraries={libraries}>
          <GoogleMap mapContainerStyle={container} center={position} zoom={15} ref={mapRef}>
            {/* StandaloneSearchBox */}
            <SearchBox onLoad={handleLoad} onPlacesChanged={handlePlacesChanged} />

            {/* MapMarker */}
            {selectedPlace && (
              <MapMarker position={selectedPlace.geometry.location} label={selectedPlace.name} />
            )}
            
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}

export default Map;
