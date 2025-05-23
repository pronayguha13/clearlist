import { useEffect, useState } from "react";
import style from "./style.module.css";

const CircularProgressBar = ({
  percentage = 75,
  size = 120,
  strokeWidth = 15,
  circleColor = "#f0f0f0",
  progressColor = "#4caf50",
  textColor = "--color-text-primary",
  showPercentage = true,
  animation = true,
}) => {
  const [currentPercentage, setCurrentPercentage] = useState(
    animation ? 0 : percentage
  );

  // Calculate circle values
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (currentPercentage / 100) * circumference;

  // Center position
  const center = size / 2;

  // Handle animation effect
  useEffect(() => {
    if (animation && currentPercentage < percentage) {
      const timer = setTimeout(() => {
        setCurrentPercentage((prev) => Math.min(prev + 1, percentage));
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [currentPercentage, percentage, animation]);

  return (
    <div className={style.wrapper}>
      <div className={style.outer} style={{ width: size, height: size }}>
        <svg width={size} height={size} className={style.inner}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={circleColor}
            strokeWidth={strokeWidth}
          />

          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={progressColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: animation
                ? "stroke-dashoffset 0.1s ease-in-out"
                : "none",
            }}
          />
        </svg>

        {/* Percentage text */}
        {showPercentage && (
          <div className={style.percentage}>
            <span className="text-2xl font-bold" style={{ color: textColor }}>
              {Math.round(currentPercentage)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CircularProgressBar;
