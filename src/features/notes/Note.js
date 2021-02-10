import { useState } from "react";
import "./Note.css";

const Note = ({ title, description, id }) => {
  const [isEditing, toggleEditing] = useState(false);

  // const note = useSelector(selectNotes);
  // const dispatch = useDispatch()

  const handleDescription = () => {
    toggleEditing(true);
  };

  const handleTitle = () => {
    toggleEditing(true);
  };

  const handleSave = () => {
    toggleEditing(false);

    // dispatch(testStore())
  };

  const handleDelete = () => {};

  return (
    <div className="note mb-3 shadow">
      <div className="note--wrapper">
        <h5 className="note__index float-end pe-2 user-select-none">
          <a href={"#" + id}> #{id}</a>
        </h5>
        <h5 className="note__title" id={id}>
          <input
            type="text"
            name="title"
            className={
              isEditing ? "note__title__input--editing" : "note__title__input"
            }
            value={title}
            placeholder="Название заметки"
            onChange={handleTitle}
          />
        </h5>
        <textarea
          className={
            isEditing ? "note__description--editing" : "note__description"
          }
          value={description}
          onChange={handleDescription}
          placeholder="Текст заметки"
        />
        <div className="note__actions--wrapper px-1">
          <div className="note__actions d-inline clearfix">
            {isEditing && (
              <div
                className="note__action__save float-start p-1"
                onClick={handleSave}
              >
                <i className="far fa-save"></i>
              </div>
            )}
            <div
              className="note__action__delete float-end p-1"
              onClick={handleDelete}
            >
              <i className="far fa-trash-alt "></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
