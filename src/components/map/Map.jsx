import React, { useEffect,useRef } from 'react';
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
  const mapRef = useRef(null);

  useEffect(() => {
    // Google マップ API の読み込みが完了した後に実行されるコード
    if (mapRef.current) {
      // デバッグ情報を表示
      console.log('mapRef:', mapRef.current);
    }
  }, [mapRef]); // mapRef が変更された場合に再実行

  const handleLoad = (searchBox, map) => {
    searchBoxRef.current = searchBox;
    mapRef.current = map;
  };

  const handlePlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      
      // デバッグ情報を表示
      console.log('places:', places);

      if (places && places.length > 0) {
        // 選択された場所の情報
        const selectedPlace = places[0];

        // 場所の名前
        const placeName = selectedPlace.name;
        console.log('場所の名前:', placeName);

        // 緯度と経度
        const latitude = selectedPlace.geometry.location.lat();
        const longitude = selectedPlace.geometry.location.lng();
        console.log('緯度:', latitude);
        console.log('経度:', longitude);

        // マップを新しい中心に移動
        const newCenter = {
          lat: latitude,
          lng: longitude
        };

        // デバッグ情報を表示
        console.log('newCenter:', newCenter);

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
        <LoadScript googleMapsApiKey='AIzaSyDdBqvRgX8FtQI1CSFntBAnjWYW3tXUnyc'
                    libraries={['places']}>
          <GoogleMap mapContainerStyle={container} center={position} zoom={15} ref={mapRef}>
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
