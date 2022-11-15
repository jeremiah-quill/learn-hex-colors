export default function ColorTracker({ colors }) {
  console.log("colors", typeof colors);
  if (colors.length === 0) return null;
  return (
    <div className="flex gap-2">
      {colors.map((color, idx) => (
        <div key={idx} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}
