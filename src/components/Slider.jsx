import React, { useState } from "react";
import "./Slider.css";

const QuadrantDisplay = ({ csvData }) => {
  const categories = ["What", "When", "Where", "Why"];

  return (
    <div className="quadrant-container">
      <h3>Extracted IoT Data</h3>
      <div className="quadrant-grid">
        {categories.map((category, index) => (
          <div key={index} className="quadrant">
            <h4>{category}</h4>
            {csvData[category] && csvData[category].length > 0 ? (
              <ul>
                {csvData[category].map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>No data available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [csvData, setCsvData] = useState({ What: [], When: [], Where: [], Why: [] });
  const [showQuadrants, setShowQuadrants] = useState(false);

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split("\n").map((row) => row.split(","));

      const headers = rows[0];
      const newData = { What: [], When: [], Where: [], Why: [] };

      rows.slice(1).forEach((row) => {
        headers.forEach((header, index) => {
          if (newData[header]) {
            newData[header].push(row[index] || "N/A");
          }
        });
      });

      setCsvData(newData);
      setShowQuadrants(true);
    };
    reader.readAsText(file);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };

  return (
    <div className="slider-wrapper">
      <div className="slider-container">
        <div className={`slide ${currentIndex === 0 ? "active" : ""}`}>
          <h1>Upload Videos</h1>
          <input type="file" accept="video/*" />
        </div>

        <div className={`slide ${currentIndex === 1 ? "active" : ""}`}>
          <h2>Upload CSV for IoT Data</h2>
          <input type="file" accept=".csv" onChange={handleCSVUpload} />
          {showQuadrants && <QuadrantDisplay csvData={csvData} />}
        </div>

        <div className={`slide ${currentIndex === 2 ? "active" : ""}`}>
          <h2>Search for Bluetooth Devices</h2>
          <button>Scan for Devices</button>
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="prev-btn" onClick={prevSlide}>
          ❮
        </button>
        <button className="next-btn" onClick={nextSlide}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default Slider;
