import { useSelector } from "react-redux";
import { selectNotes } from "./notesSlice";
import Note from "./Note";

const NoteList = ({ notes }) => {
  return (
    <div className="notes__list">
      {notes.map((note, idx) => (
        <Note {...note} key={idx} />
      ))}
    </div>
  );
};

const Notes = () => {
  const notes = useSelector(selectNotes);

  return (
    <div className="notes">
      <NoteList notes={notes} />
    </div>
  );
};

export default Notes;
