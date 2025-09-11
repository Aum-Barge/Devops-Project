import React from "react";
import { useState } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(50); // Initial progress value

  return (
    <div className="flex flex-col items-center gap-4">
      <progress className="progress progress-secondary w-56" value={progress} max="100"></progress>
      <button 
        className="btn btn-primary"
        onClick={() => setProgress(progress + 10)} // Increases progress by 10
      >
        Increase Progress
      </button>
    </div>
  );
};

export default ProgressBar;
