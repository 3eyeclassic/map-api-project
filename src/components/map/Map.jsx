import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import React, { useState, useEffect } from 'react'
import SearchBox from './SearchBox ';

function Map() {
  const container = {
    width: "100%",
    height: "100vh"
  };
  
  const position = {
    lat: 35.680959106959,
    lng: 139.76730676352
  };

  return (
    <LoadScript googleMapsApiKey='AIzaSyBs96NATLrbNmc7DC_RVO67j_rPj3QpdzY'>
          <SearchBox />
          <GoogleMap mapContainerStyle={container} center={position} zoom={15}>
            {/*ここにmap上に表示する機能を記述  */}
            {/* マーカー */}
            <MarkerF position={position} label={"東京駅です！"} />
            {/* サーチボックス */}
          </GoogleMap>    
        </LoadScript>
  )
};




export default Map;