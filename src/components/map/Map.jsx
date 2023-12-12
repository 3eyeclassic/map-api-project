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

  useEffect(() => {
    // Google マップ API の読み込みが完了した後に実行されるコード
    if (mapRef.current) {
      // デバッグ情報を表示
      console.log('mapRef:', mapRef.current);
    }
  }, [mapRef]); // mapRef が変更された場合に再実行

  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleLoad = (searchBox) => {
    searchBoxRef.current = searchBox;
  };

  const handlePlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      
      if (places && places.length > 0) {
        // 選択された場所の情報
        const selectedPlace = places[0];
        setSelectedPlace(selectedPlace);

        // 緯度と経度
        const latitude = selectedPlace.geometry.location.lat();
        const longitude = selectedPlace.geometry.location.lng();

        // マップを新しい中心に移動
        const newCenter = {
          lat: latitude,
          lng: longitude
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
            
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}

export default Map;
