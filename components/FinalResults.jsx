import { BsCheckLg, BsXLg } from "react-icons/bs";
import Score from "./Score";

export default function FinalResults({ results, score, onReset = () => {} }) {
  if (results.length === 0) return null;

  return (
    <>
      <h1 className={`text-black text-[100px] md:text-[300px] font-bold text-center`}>
        {score}
        {/* <Score score={score} /> */}
      </h1>
      <div className="w-full flex flex-1">
        {results.map((result, idx) => (
          <div
            key={idx}
            className="font-bold flex justify-center items-start text-sm flex-1 p-4"
            style={{ backgroundColor: result.color }}>
            <div className="bg-zinc-100 p-2">
              <h2>{result.color}</h2>
              <div className="flex gap-2 mt-2 justify-center">
                {Array(result.right).fill(
                  <div className="flex flex-col items-center text-green-500">
                    <BsCheckLg />
                    <div>+100</div>
                  </div>
                )}
                {Array(result.wrong).fill(
                  <div className="flex flex-col items-center text-red-500">
                    <BsXLg />
                    <div>-50</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
