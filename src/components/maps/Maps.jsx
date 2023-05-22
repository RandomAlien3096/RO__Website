import React from 'react';
import './maps.css';

import {useMemo} from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Maps = () => {
  const { isLoaded } = useLoadScript({ 
    googleMapsApiKey: 'process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY',
    //googleMapsApiKey: "AIzaSyBCVxdfTabBoeB863_aiSBi_dgxwMQzkJE",
     });

   if (!isLoaded) return <div>Loading...</div>;

   
   return <Map />
  }
  
function Map() {
  const center = useMemo(() => (
   { lat: 14.608035512342898, lng: -90.51561171346732 }), []);
  return (
    <div className='RO__map-container'>
      <GoogleMap 
        options={{
          styles: [{ stylers: [{ 'saturation': 25 }, { 'gamma': 0.9 }] }]
          }}
        zoom = {15} 
        center = {center} 
        mapContainerClassName='RO__map-container' 
      > 
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}
  export default Maps