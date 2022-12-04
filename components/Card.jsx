export function Card({ children, className }) {
  const defaultClasses = `bg-zinc-100/70 rounded-lg shadow-md p-4`;

  return <div className={`${defaultClasses} ${className}`}>{children}</div>;
}
