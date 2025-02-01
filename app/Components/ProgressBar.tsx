import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <>
      <div className="w-3/6 top-36 absolute bg-transparent flex justify-center items-center h-fit">
        <div
          className={`radial-progress transition-all ${
            progress < 50
              ? "text-green-500"
              : progress > 75
                ? "text-red-500 animate-ping"
                : "text-yellow-300"
          }`}
          style={{
            "--value": progress,
            "--size": "60px",
            "--thickness": "9px",
          }}
          role="progressbar"
        ></div>
      </div>
      <div className="w-3/6 top-36 absolute bg-transparent flex justify-center items-center h-fit">
        <div
          className={`radial-progress transition-all ${
            progress < 50
              ? "text-green-500"
              : progress > 75
                ? "text-red-500"
                : "text-yellow-300"
          }`}
          style={{
            "--value": progress,
            "--size": "60px",
            "--thickness": "9px",
          }}
          role="progressbar"
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
