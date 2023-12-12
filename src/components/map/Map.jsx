import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import SearchBox from './StandaloneSearchBox ';
import MapMarker from './MapMarker';

const container = {
  width: "100%",
  height: "100vh"
};

const libraries = ['places'];

const initialPosition = {  // 初期位置を定義
  lat: 35.680959106959,
  lng: 139.76730676352
};

function Map() {
  const searchBoxRef = useRef(null);
  const [center, setCenter] = useState(initialPosition); 
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleLoad = (searchBox, map) => {
    searchBoxRef.current = searchBox;
  };

  const handlePlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();

      console.log('Places:', places);
      
      if (places && places.length > 0) {
        const selectedPlace = places[0];
        setSelectedPlace(selectedPlace);

        const latitude = selectedPlace.geometry.location.lat();
        const longitude = selectedPlace.geometry.location.lng();

        // 中心位置を更新し、再描画をトリガー
        setCenter({ lat: latitude, lng: longitude });
      }
    }
  };

  return (
    <>
      <h1>React & Google Map</h1>
      <div className='wrap'>
        <LoadScript googleMapsApiKey='AIzaSyDdBqvRgX8FtQI1CSFntBAnjWYW3tXUnyc' libraries={libraries}>
          <GoogleMap mapContainerStyle={container} center={center} zoom={15}>
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
