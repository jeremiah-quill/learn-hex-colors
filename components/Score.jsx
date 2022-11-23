import { useEffect, useState } from "react";

export default function Score({ score, totalScore, timeRemaining }) {
  const [scoreState, setScoreState] = useState(score);
  const [timeRemainingState, setTimeRemainingState] = useState(timeRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scoreState < totalScore && timeRemainingState > 0) {
        setScoreState(scoreState + 1);
        setTimeRemainingState(timeRemainingState - 1);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [scoreState, timeRemaining]);

  return (
    <div className="flex items-baseline justify-center">
      <h1 className="col-span-8 text-black text-[100px] md:text-[300px] font-bold text-center">
        {scoreState}
      </h1>
      {timeRemainingState > 0 ? (
        <h1 className="col-span-4 text-black text-5xl font-bold text-center">
          (Time Bonus: {timeRemainingState})
        </h1>
      ) : null}
    </div>
  );
}
