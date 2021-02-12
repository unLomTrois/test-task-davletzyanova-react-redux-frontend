import { useSelector } from "react-redux";
import { selectAllNotes } from "./notesSlice";
import Note from "./Note";
import SubmitNote from "./SubmitNote";

const NoteListEmpty = () => {
  return (
    <h5 className="notes__list--empty">
      Пока заметок нет <i className="far fa-sad-tear"></i>
    </h5>
  );
};

const NoteList = ({ notes }) => {
  return (
    <div className="notes__list">
      {notes && notes.map((note, idx) => <Note {...note} key={idx} />)}
    </div>
  );
};

const Notes = () => {
  const notes = useSelector(selectAllNotes);

  return (
    <div className="notes">
      <SubmitNote />
      {notes.length ? <NoteList notes={notes} /> : <NoteListEmpty />}
    </div>
  );
};

export default Notes;
