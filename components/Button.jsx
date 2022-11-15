export default function Button({ children, onClick }) {
  return (
    <button onClick={() => onClick()} className="px-4 py-2 bg-slate-300 rounded-3xl">
      {children}
    </button>
  );
}
