export function RoundResult({ children, color = "white" }) {
  return (
    <div
      style={{ backgroundColor: color }}
      className="h-full w-full transition-all font-bold text-4xl flex justify-center items-center">
      {children}
    </div>
  );
}
