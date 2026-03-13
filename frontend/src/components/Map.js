import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../services/api';
import 'leaflet/dist/leaflet.css';

function OutbreakMap() {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/reports');
        setReports(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  const parseCoords = loc => {
    const [lat, lng] = loc.split(',').map(Number);
    return [lat || 0, lng || 0];
  };

  return (
    <MapContainer center={[0,0]} zoom={2} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {reports.map(r => (
        <Marker key={r._id} position={parseCoords(r.location)}>
          <Popup>
            {r.patient.name}: {r.prediction}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default OutbreakMap;