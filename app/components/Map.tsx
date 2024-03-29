'use client'

import React from 'react'
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

//@ts-expect-error
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src
});

interface MapProps {
    center?: number[]
}
const Map: React.FC<MapProps> = ({
    center
}) => {
  return (
    <MapContainer 
    center={center as L.LatLngExpression || [14.599512, 120.984222]}
    zoom={center ? 5 : 7}
    scrollWheelZoom={false}
    className='h-[35vh] rounded-lg'
    >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {center && (<Marker position={center as L.LatLngExpression}>
        </Marker>)}
    </MapContainer>
  )
}

export default Map