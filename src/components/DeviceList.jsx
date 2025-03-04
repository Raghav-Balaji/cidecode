import React from 'react';

const DeviceList = ({ devices }) => {
  return (
    <div>
      {devices.length === 0 ? (
        <p>No devices found.</p>
      ) : (
        <ul>
          {devices.map((device, index) => (
            <li key={index}>
              <strong>Name:</strong> {device.name} <br />
              <strong>Type:</strong> {device.type} <br />
              <strong>Address:</strong> {device.address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeviceList;
