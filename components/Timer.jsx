import { useState, useEffect } from "react";

export default function Timer({ isRunning, time }) {
  const [timer, setTimer] = useState(time);
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  });
  return <div>{timer}</div>;
}
