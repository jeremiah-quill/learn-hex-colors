export default function Button({ classes, children, onClick = () => {} }) {
  return (
    <button onClick={() => onClick()} className={`px-4 py-2 rounded-3xl ${classes}`}>
      {children}
    </button>
  );
}
