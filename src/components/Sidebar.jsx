import React, { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({ toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bluetoothDevice, setBluetoothDevice] = useState(null);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-theme" : "light-theme";
  }, [isDarkMode]);

  const connectBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      });
      setBluetoothDevice(device.name || "Unknown Device");
      alert(`Connected to ${device.name}`);
    } catch (error) {
      alert("Failed to connect to Bluetooth device. Make sure Bluetooth is enabled.");
    }
  };

  return (
    <>
      {/* Toggle Sidebar Button */}
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Open"}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"} ${isDarkMode ? "dark-theme" : "light-theme"}`}>
        <div className="sidebar-content">
          <h2>Menu</h2>
          <ul>
            <li onClick={() => setShowAbout(true)}>About</li>
          </ul>

          {/* Settings Dropdown */}
          <div className={`dropdown ${settingsOpen ? "open" : ""}`}>
            <button className="dropdown-toggle" onClick={() => setSettingsOpen(!settingsOpen)}>
              Settings {settingsOpen ? "▲" : "▼"}
            </button>
            <div className="dropdown-menu">
              <button onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? "Light Theme" : "Dark Theme"}
              </button>
              <button onClick={connectBluetooth}>Connect Bluetooth</button>
            </div>
          </div>

          {/* Show connected device */}
          {bluetoothDevice && <p>Connected: {bluetoothDevice}</p>}
        </div>
      </div>

      {/* About Popup */}
      {showAbout && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowAbout(false)}>&times;</span>
            <h2>About the Project</h2>
            <p>This project identifies and lists nearby IoT and network devices for debugging and data analysis.</p>
            <p>It provides real-time device detection, connectivity, and data extraction features.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
