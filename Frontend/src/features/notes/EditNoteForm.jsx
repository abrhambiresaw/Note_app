import { useState, useEffect } from "react";
import {
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function EditNoteForm({ note, users }) {
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);

  // IMPORTANT: completed, not comleted
  const [completed, setCompleted] = useState(note.completed);

  const [userId, setUserId] = useState(note.user);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setUserId("");

      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };

  const onTextChanged = (e) => {
    setText(e.target.value);
  };

  const onCompletedChanged = () => {
    setCompleted((prev) => !prev);
  };

  const onUserIdChanged = (e) => {
    setUserId(e.target.value);
  };

  const canSave =
    [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();

    if (canSave) {
      await updateNote({
        id: note.id,
        user: userId,
        title,
        text,
        completed,
      });
    }
  };

  const onDeleteNoteClicked = async (e) => {
    e.preventDefault();

    await deleteNote({
      id: note.id,
    });
  };

  const created = new Date(note.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const updated = new Date(note.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const options = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.username}
    </option>
  ));

  const errContent =
    error?.data?.message || delerror?.data?.message || "";

  const validTitleClass = !title
    ? "border-red-500"
    : "border-gray-300";

  const validTextClass = !text
    ? "border-red-500"
    : "border-gray-300";

  return (
    <main className="w-full px-4 py-5 sm:px-6 md:px-4">
      {/* Error */}
      {(isError || isDelError) && (
        <p className="mb-3 inline-block bg-white p-1 text-[firebrick]">
          {errContent}
        </p>
      )}

      <form
        className="w-full max-w-[850px]"
        onSubmit={onSaveNoteClicked}
      >
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Edit Note #{note.ticket}
          </h2>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-2">
            {/* SAVE */}
            <button
              type="submit"
              title="Save"
              disabled={!canSave}
              className="
                grid
                h-12
                w-12
                place-content-center
                border-none
                bg-transparent
                text-[2.3rem]
                text-white
                transition-transform
                hover:scale-110
                focus-visible:scale-110
                focus-visible:outline-none
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <FontAwesomeIcon icon={faSave} />
            </button>

            {/* DELETE */}
            <button
              type="button"
              title="Delete"
              onClick={onDeleteNoteClicked}
              className="
                grid
                h-12
                w-12
                place-content-center
                border-none
                bg-transparent
                text-[2.3rem]
                text-white
                transition-transform
                hover:scale-110
                focus-visible:scale-110
                focus-visible:outline-none
              "
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>

        {/* ================================================= */}
        {/* TITLE */}
        {/* ================================================= */}

        <label
          className="mb-2 block text-base text-white sm:text-lg"
          htmlFor="note-title"
        >
          Title:
        </label>

        <input
          className={`
            mb-3
            h-[45px]
            w-full
            rounded-xl
            border-2
            bg-white
            px-2
            text-base
            text-gray-900
            outline-none
            focus:border-blue-500
            ${validTitleClass}
          `}
          id="note-title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        {/* ================================================= */}
        {/* TEXT */}
        {/* ================================================= */}

        <label
          className="mb-2 block text-base text-white sm:text-lg"
          htmlFor="note-text"
        >
          Text:
        </label>

        <textarea
          className={`
            min-h-[150px]
            w-full
            resize-none
            rounded-xl
            border-2
            bg-white
            px-2
            py-2
            text-base
            text-gray-900
            outline-none
            focus:border-blue-500
            sm:min-h-[180px]
            ${validTextClass}
          `}
          id="note-text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />

        {/* ================================================= */}
        {/* BOTTOM INFORMATION */}
        {/* ================================================= */}

        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-3">
            {/* WORK COMPLETE */}

            <label
              className="flex w-fit items-center gap-2 text-base text-white sm:text-lg"
              htmlFor="note-completed"
            >
              WORK COMPLETE:

              <input
                className="h-5 w-5 cursor-pointer accent-blue-500"
                id="note-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={onCompletedChanged}
              />
            </label>

            {/* ASSIGNED TO */}

            <label
              className="text-base text-white sm:text-lg"
              htmlFor="note-username"
            >
              ASSIGNED TO:
            </label>

            <select
              id="note-username"
              name="username"
              className="
                w-fit
                min-w-[100px]
                rounded-md
                border-2
                border-gray-300
                bg-white
                px-2
                py-1
                text-base
                text-gray-900
                outline-none
                focus:border-blue-500
              "
              value={userId}
              onChange={onUserIdChanged}
            >
              {options}
            </select>
          </div>

          {/* RIGHT SIDE */}
          <div className="text-base text-white sm:text-lg">
            {/* CREATED */}

            <p className="mb-3">
              <span className="font-medium">Created:</span>
              <br />
              {created}
            </p>

            {/* UPDATED */}

            <p>
              <span className="font-medium">Updated:</span>
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </main>
  );
}

export default EditNoteForm;