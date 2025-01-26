import React, { useEffect, useState } from "react";

type ProgressBarProps = {
  duration: number;
  onComplete?: () => void;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ duration, onComplete }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-blue-500 h-4 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
