export default function ColorTracker({ colorHistory }) {
  if (colorHistory.length === 0) return null;

  return (
    <div className="flex gap-2 flex-wrap">
      {colorHistory.map((color, idx) =>
        color.isCorrect ? (
          <div
            key={idx}
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color.color }}
          />
        ) : null
      )}
    </div>
  );
}
