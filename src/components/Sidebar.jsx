import React, { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({ toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-theme" : "light-theme";
  }, [isDarkMode]);

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
              <button>Connect Bluetooth</button>
            </div>
          </div>
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
