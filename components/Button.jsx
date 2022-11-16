export default function Button({ classes, children, onClick = () => {}, disabled = false }) {
  return (
    <button
      onClick={() => onClick()}
      className={`transition-all ${classes} ${disabled ? "cursor-not-allowed" : ""}`}>
      {children}
    </button>
  );
}
