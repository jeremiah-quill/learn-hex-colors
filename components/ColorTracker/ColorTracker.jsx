import { BsCheckLg, BsXLg } from "react-icons/bs";
import { RoundResult } from "./RoundResult";

export function ColorTracker({ rounds }) {
  if (rounds.length === 0) return null;

  return rounds.map((round, idx) =>
    round.right > 0 ? (
      <RoundResult key={idx} color={round.color}>
        <BsCheckLg className="text-green-500" />
      </RoundResult>
    ) : round.wrong === 2 ? (
      <RoundResult key={idx} color={round.color}>
        <BsXLg className="text-red-500 text-4xl" />
      </RoundResult>
    ) : (
      <RoundResult key={idx}>R{idx + 1}</RoundResult>
    )
  );
}
