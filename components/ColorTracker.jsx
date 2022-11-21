import { BsCheckLg, BsXLg } from "react-icons/bs";

export default function ColorTracker({ rounds }) {
  if (rounds.length === 0) return null;

  return rounds.map((round, idx) =>
    round.right > 0 ? (
      <div
        key={idx}
        className="h-full w-full transition-all flex justify-center items-center"
        style={{ backgroundColor: round.color }}>
        <BsCheckLg className="text-green-500 text-4xl" />
      </div>
    ) : round.wrong === 2 ? (
      <div
        key={idx}
        className="h-full w-full transition-all flex justify-center items-center"
        style={{ backgroundColor: round.color }}>
        <BsXLg className="text-red-500 text-4xl" />
      </div>
    ) : (
      <div
        key={idx}
        className="h-full w-full transition-all font-bold text-4xl flex justify-center items-center">
        R{idx + 1}
      </div>
    )
  );
}
