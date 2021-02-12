import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { notesRemove, notesUpdate } from "./notesSlice";

import "./Note.css";

const Note = ({ id, title, description }) => {
  const [isEditing, toggleEditing] = useState(false);
  const [editable_title, editTitle] = useState(title);
  const [editable_description, editDescription] = useState(description);

  const description_ref = useRef(0);

  const dispatch = useDispatch();

  useEffect(() => {
    // to expand height on mount
    description_ref.current.style.height = `${description_ref.current.scrollHeight}px`;
  });

  const handleTitle = (e) => {
    toggleEditing(true);
    editTitle(e.target.value);
  };

  const handleDescription = (e) => {
    toggleEditing(true);
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;

    editDescription(e.target.value);
  };

  const handleSave = () => {
    toggleEditing(false);

    dispatch(
      notesUpdate({
        id,
        changes: {
          title: editable_title,
          description: editable_description,
        },
      })
    );
    fetch(`api/notes/${id}/update`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editable_title,
        description: editable_description,
      }),
    });
  };

  const handleDelete = () => {
    console.log(id);

    dispatch(notesRemove(id));

    fetch(`api/notes/${id}/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <div className="note mb-3 shadow">
      <div className="note--container">
        <h5 className="note__title" id={id}>
          <input
            type="text"
            name="title"
            className={
              isEditing ? "note__title__input--editing" : "note__title__input"
            }
            value={isEditing ? editable_title : title}
            placeholder="Название заметки"
            onChange={handleTitle}
          />
        </h5>
        <textarea
          className={
            isEditing ? "note__description--editing" : "note__description"
          }
          value={isEditing ? editable_description : description}
          onChange={handleDescription}
          placeholder="Текст заметки"
          ref={description_ref}
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
