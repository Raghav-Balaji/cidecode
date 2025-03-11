import React, { useState } from "react";

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const uploadVideo = () => {
    if (videoFile) {
      alert(`Uploading ${videoFile.name}...`);
    } else {
      alert("Please select a video file.");
    }
  };

  return (
    <div className="card">
      <h3>Upload Video</h3>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={uploadVideo}>Upload</button>
    </div>
  );
};

export default VideoUpload;
