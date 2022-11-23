import { useEffect } from "react";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import Score from "./Score";

export default function FinalResults({ results, score, timeRemaining, onReset = () => {} }) {
  if (results.length === 0) return null;

  const totalScore = score + timeRemaining * 10;

  useEffect(() => {
    async function sendScore() {
      const res = await fetch("/api/sendScore", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ score: totalScore, name: "Anonymous" }),
      });
      const data = await res.json();
      return data;
    }
    sendScore();
  }, []);

  return (
    <>
      <Score {...{ score, totalScore, timeRemaining }} />
      <div className="w-full grid grid-cols-10 flex-1">
        {results.map((result, idx) => (
          <div
            key={idx}
            className="font-bold flex justify-center items-start text-sm flex-1 p-4 group"
            style={{ backgroundColor: result.color }}>
            <div className="bg-zinc-100 p-2 hidden group-hover:block transition-all">
              <h2>{result.color}</h2>
              <div className="flex gap-2 mt-2 justify-center">
                {Array(result.wrong)
                  .fill(
                    <div className="flex flex-col items-center text-red-500">
                      <BsXLg />
                      <div>-50</div>
                    </div>
                  )
                  .map((icon, idx) => (
                    <div key={idx}>{icon}</div>
                  ))}
                {Array(result.right)
                  .fill(
                    <div className="flex flex-col items-center text-green-500">
                      <BsCheckLg />
                      <div>+100</div>
                    </div>
                  )
                  .map((icon, idx) => (
                    <div key={idx}>{icon}</div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
