// import React, { useEffect, useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
// import api from '../services/api';
// import useProtectedRoute from './ProtectedRoute';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Fix Leaflet marker icon issue
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

// const MapView = () => {
//   const [mapData, setMapData] = useState({ lat: 20.5937, lng: 78.9629, zoom: 5 });
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   useProtectedRoute();

//   useEffect(() => {
//     const fetchMapData = async () => {
//       try {
//         const response = await api.get('/map');
//         setMapData(response);
//       } catch (error) {
//         console.error('Error fetching map data:', error);
//         if (error.response && error.response.status === 401) {
//           alert('User not logged in');
//           navigate('/login');
//         }
//       }
//     };
//     fetchMapData();
//   }, [navigate]);

//   // Function to update map view
//   const LocationMarker = () => {
//     const map = useMap();
//     useEffect(() => {
//       map.setView([mapData.lat, mapData.lng], mapData.zoom);
//     }, [map, mapData]);

//     return <Marker position={[mapData.lat, mapData.lng]} />;
//   };

//   return (
//     <div>
//       <h2>Map View</h2>
//       <MapContainer center={[mapData.lat, mapData.lng]} zoom={mapData.zoom} style={{ height: '500px', width: '100%' }}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <LocationMarker />
//       </MapContainer>
//     </div>
//   );
// };

// export default MapView;
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = () => {
  const [position, setPosition] = useState([20.5937, 78.9629]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
    });
  }, []);

  return (
    <MapContainer center={position} zoom={5} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>Your Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
