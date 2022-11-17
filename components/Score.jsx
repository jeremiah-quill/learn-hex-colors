import { useEffect, useState } from "react";

export default function Score({ score }) {
  const [scoreState, setScoreState] = useState(score / 2);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scoreState < score) {
        setScoreState(scoreState + 1);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [scoreState]);
  return <h1>{scoreState}</h1>;
}
