import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import SearchBox from './StandaloneSearchBox ';
import MapMarker from './MapMarker';
import InfoWindow from './InfoWindow';
import ClickedLocationInfoWindow from './ClickedLocationInfoWindow';

const libraries = ['places'];

function Map() {
  const searchBoxRef = useRef(null);
  const mapRef = useRef(null);
  const [center, setCenter] = useState(null); 
  const [selectedPlace, setSelectedPlace] = useState(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCenter(userLatLng); // ユーザーの位置でcenterステートを更新

          if (mapRef.current) {
            mapRef.current.panTo(userLatLng);
            mapRef.current.setZoom(15);
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleUpdateCenter = () => {
    getUserLocation();
  };

  // コンポーネントがマウントされた時にユーザーの位置を取得
  useEffect(() => {
    getUserLocation();
  }, []);

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

  const handleInfoWindowClose = () => {
    setSelectedPlace(null);
  };

  return (
    <>
      <div className='wrap' style={{ position: 'relative' }}>
        <LoadScript 
          googleMapsApiKey='AIzaSyDdBqvRgX8FtQI1CSFntBAnjWYW3tXUnyc' 
          libraries={libraries}
        >
          <GoogleMap 
            mapContainerStyle={{ width: "100%", height: "100vh" }} 
            center={center} 
            zoom={15} 
            onLoad={(map) => (mapRef.current = map)}
          >
            {/* StandaloneSearchBox */}
            <SearchBox onLoad={handleLoad} onPlacesChanged={handlePlacesChanged}/>

            {selectedPlace && (
              <InfoWindow
                selectedPlace={selectedPlace}
                onCloseClick={() => setSelectedPlace(null)}
              />
            )}

            {/* MapMarker for selected place */}
            {selectedPlace && (
              <MapMarker 
              position={selectedPlace.geometry.location} 
              label={selectedPlace.name} 
            />
          )}

            {/* Marker for user's current location */}
            {center !== null && (
            <Marker 
              position={center} 
              icon={{ path: window.google.maps.SymbolPath.CIRCLE, scale: 8 }} 
            />
            )}

            {/* Button to update center to user's location */}
            <button 
              onClick={handleUpdateCenter} 
              style={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}
            >
              現在地を取得
            </button>
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}

export default Map;
