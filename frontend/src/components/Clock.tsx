import React, { useEffect, useState } from "react";

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = ((hours % 12) / 12) * 360 + minutes * 0.5;

  // Positions for numbers around the clock (12 numbers)
  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="analog-clock">
      {/* Clock Numbers */}
      {numbers.map((num) => {
        const angle = (num * 30) - 90; // 30deg per number, offset -90 to start at top
        const radius = 45; // radius from center
        const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
        const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
        return (
          <div
            key={num}
            className="clock-number"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
          >
            {num}
          </div>
        );
      })}

      {/* Clock Hands */}
      <div className="dial hour-hand" style={{ transform: `rotate(${hourDeg}deg)` }} />
      <div className="dial minute-hand" style={{ transform: `rotate(${minuteDeg}deg)` }} />
      <div className="dial second-hand" style={{ transform: `rotate(${secondDeg}deg)` }} />
      <div className="center-dot" />
    </div>
  );
};

export default Clock;
