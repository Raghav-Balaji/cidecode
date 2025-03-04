import React, { useState } from 'react';
//import axios from 'axios';
import Sidebar from './components/Sidebar'; // Import Sidebar

import DeviceList from './components/DeviceList';

const App = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDevices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/devices');
      setDevices(response.data.devices);
    } catch (err) {
      setError('Failed to fetch devices.');
    }
    setLoading(false);
  };

  return (

    <div className="app-container">
      <Sidebar /> {/* Sidebar always visible */}
      <div className="main-content">
        <h1>Nearby IoT Devices</h1>
        <button onClick={fetchDevices} disabled={loading}>
          {loading ? 'Scanning...' : 'Scan for Devices'}
        </button>
        {error && <p className="error">{error}</p>}
        <DeviceList devices={devices} />
      </div>
    </div>
  );
};

export default App;
