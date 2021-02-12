import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLastNoteID, notesAddOne } from "./notesSlice";
import "./SubmitNote.css";

const SubmitNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const next_id = useSelector(getLastNoteID) + 1;
  const description_ref = useRef(0)

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    // resize textarea
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;

    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(notesAddOne({ id: next_id, title, description }));
    fetch("http://localhost:5000/api/notes/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: next_id, title, description }),
    })

    // clear fields
    setTitle("");
    setDescription("");
    description_ref.current.style.height = "inherit"
  };

  return (
    <form className="note mb-3 shadow" onSubmit={handleSubmit}>
      <div className="submit-note--wrapper">
        <h5 className="submit-note_title">
          <input
            type="text"
            name="title"
            className="submit-note__title--input"
            value={title}
            placeholder="Заголовок"
            onChange={handleTitle}
          />
        </h5>
        <textarea
          className="submit-note__text"
          value={description}
          onChange={handleDescription}
          placeholder="Заметка"
          ref={description_ref}
        />
        <div className="submit-note_actions--wrapper px-1">
          <div className="submit-note_actions d-inline clearfix">
            <div className="submit-note__action__submit float-end pt-2">
              <button
                type="submit"
                className="btn submit__button"
                disabled={!(title || description)}
              >
                <i className="fas fa-plus-circle"></i> Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SubmitNote;
