export default function SelectionButton({ selection, isShowing, onClick = () => {} }) {
  if (!isShowing) return null;
  return (
    <>
      <Button onClick={onClick}>{selection.color}</Button>
    </>
  );
}
