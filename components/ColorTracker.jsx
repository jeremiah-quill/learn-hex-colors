export default function ColorTracker({ results }) {
  if (results.length === 0) return null;

  return (
    // <div className="flex gap-2 flex-wrap">
    results.map((result, idx) =>
      result.isCorrect ? (
        <div
          key={idx}
          className="h-full w-full transition-all"
          style={{ backgroundColor: result.color }}
        />
      ) : null
    )
    // </div>
  );
}
