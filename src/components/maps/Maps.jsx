import React from 'react';
import './maps.css';

import {useMemo} from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Maps = () => {
  const { isLoaded } = useLoadScript({ 
    googleMapsApiKey: 'process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY',
   });
  return (
    <div>Map</div>
  )
}

export default Maps