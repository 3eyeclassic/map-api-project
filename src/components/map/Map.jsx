import React, { useRef } from 'react';
import { GoogleMap, LoadScript, MarkerF, StandaloneSearchBox } from '@react-google-maps/api';

const container = {
  width: "75%",
  height: "500px"
};

const position = {
  lat: 35.680959106959,
  lng: 139.76730676352
};

function Map() {
  const searchBoxRef = useRef(null);

  const handleLoad = (searchBox) => {
    searchBoxRef.current = searchBox;
  };

  const handlePlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places.length > 0) {
        const newCenter = {
          lat: places[0].geometry.location.lat(),
          lng: places[0].geometry.location.lng()
        };
        // Update the map center to the selected place
        // Optionally, you may want to update other components or state based on the selected place
      }
    }
  };

  return (
    <>
      <h1>React & Google Map</h1>
      <div className='wrap'>
        <LoadScript googleMapsApiKey='AIzaSyDdBqvRgX8FtQI1CSFntBAnjWYW3tXUnyc'
                    libraries={['places']}>
          <GoogleMap mapContainerStyle={container} center={position} zoom={15}>
            {/* StandaloneSearchBox */}
            <StandaloneSearchBox
              onLoad={handleLoad}
              onPlacesChanged={handlePlacesChanged}
            >
              <input
                type="text"
                placeholder="Search for a place"
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `240px`,
                  height: `32px`,
                  padding: `0 12px`,
                  borderRadius: `3px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: "absolute",
                  left: "50%",
                  marginLeft: "-120px"
                }}
              />
            </StandaloneSearchBox>

            {/* Marker */}
            <MarkerF position={position} label={"東京駅です！"} />
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}

export default Map;
