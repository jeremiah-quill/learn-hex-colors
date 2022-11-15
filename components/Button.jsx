export default function Button({ classes, children, onClick = () => {}, disabled = false }) {
  return (
    <button
      onClick={() => onClick()}
      className={`transition-all px-4 py-2 rounded-3xl ${classes} ${
        disabled ? "cursor-not-allowed" : ""
      }`}>
      {children}
    </button>
  );
}
