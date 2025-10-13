// src/components/MapInput.jsx
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Don't forget to import Leaflet's CSS

// Fix for default marker icon issue with Webpack/Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LocationMarker = ({ setPosition }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      setMarkerPosition(e.latlng);
      setPosition(e.latlng); // Update parent state
    },
    locationfound(e) {
      setMarkerPosition(e.latlng);
      setPosition(e.latlng); // Update parent state
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    map.locate(); // Try to get user's initial location
  }, [map]);

  return markerPosition === null ? null : (
    <Marker position={markerPosition}></Marker>
  );
};

export default function MapInput({ onLocationChange, initialPosition }) {
  const [center, setCenter] = useState(initialPosition || [51.505, -0.09]); // Default to London
  const [zoom, setZoom] = useState(initialPosition ? 13 : 8);

  const handleSetPosition = useCallback((latlng) => {
    onLocationChange({ latitude: latlng.lat, longitude: latlng.lng });
  }, [onLocationChange]);

  return (
    <div className="w-full h-80 rounded-md overflow-hidden border border-gray-300">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true} 
        className="w-full h-full"
        whenCreated={map => {
          // Ensure the initial position is set on the map
          if (initialPosition) {
            map.setView(initialPosition, zoom);
          }
        }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setPosition={handleSetPosition} />
      </MapContainer>
    </div>
  );
}