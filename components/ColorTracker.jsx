export default function ColorTracker({ colors }) {
  return (
    <div className="flex gap-2">
      {colors.map((color) => (
        <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}
