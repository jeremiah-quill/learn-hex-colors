export function HighscoreForm({ onSubmit = () => {}, nameInput, setNameInput }) {
  return (
    // <div className="flex border-2 border-black max-w-lg mx-auto mb-8">
    <form onSubmit={onSubmit} className="flex flex-col gap-2 p-4">
      <h1 className="text-2xl font-bold">Submit your score</h1>
      <input
        type="text"
        placeholder="Your name"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        className="border-2 border-black p-2"
      />
      <button type="submit" className="bg-zinc-100 hover:bg-zinc-700 transition-all p-2">
        Submit
      </button>
    </form>
    // </div>
  );
}
