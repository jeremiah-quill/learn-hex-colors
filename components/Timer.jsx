import { useEffect } from "react";

export default function Timer({
  time,
  onTick = () => {},
  onTimerEnd = () => {},
  classes = "",
  penalized = false,
}) {
  useEffect(() => {
    if (time === 0 || time < 0) {
      onTimerEnd();
    } else {
      const interval = setInterval(() => {
        onTick();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [time]);
  if (time < 0) return 0;
  return (
    <div
      className={`p-2 transition-all rounded-md ${classes} ${
        penalized === true ? "bg-red-300" : ""
      }`}>
      {time}
    </div>
  );
}
