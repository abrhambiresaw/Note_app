import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "./notesApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

function NewNoteForm({ users }) {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");

      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);

  const onTextChanged = (e) => setText(e.target.value);

  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();

    if (canSave) {
      await addNewNote({
        user: userId,
        title,
        text,
      });
    }
  };

  const options = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.username}
    </option>
  ));

  const validTitleClass = !title
    ? "border-red-500"
    : "border-gray-300";

  const validTextClass = !text
    ? "border-red-500"
    : "border-gray-300";

  return (
    <main className="w-full px-4 py-6 sm:px-6 md:px-8">
      {/* Error message */}
      {isError && (
        <p className="mb-4 inline-block bg-white p-1 text-[firebrick]">
          {error?.data?.message}
        </p>
      )}

      <form
        className="w-full max-w-[850px]"
        onSubmit={onSaveNoteClicked}
      >
        {/* ================= HEADER ================= */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            New Note
          </h2>

          {/* Save button */}
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
              text-[2.5rem]
              text-white
              transition-transform
              hover:scale-[1.15]
              focus-visible:scale-[1.15]
              focus-visible:outline-none
              disabled:invisible
            "
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        </div>

        {/* ================= TITLE ================= */}
        <div className="mb-3">
          <label
            className="mb-2 block text-base text-white sm:text-lg"
            htmlFor="title"
          >
            Title:
          </label>

          <input
            className={`
              h-[45px]
              w-full
              rounded-xl
              border-2
              bg-white
              px-2
              text-base
              text-gray-900
              outline-none
              transition
              focus:border-blue-500
              ${validTitleClass}
            `}
            id="title"
            name="title"
            type="text"
            autoComplete="off"
            value={title}
            onChange={onTitleChanged}
          />
        </div>

        {/* ================= TEXT ================= */}
        <div className="mb-3">
          <label
            className="mb-2 block text-base text-white sm:text-lg"
            htmlFor="text"
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
              transition
              focus:border-blue-500
              sm:min-h-[180px]
              ${validTextClass}
            `}
            id="text"
            name="text"
            value={text}
            onChange={onTextChanged}
          />
        </div>

        {/* ================= ASSIGNED TO ================= */}
        <div className="flex items-start gap-4">
          <div>
            <label
              className="mb-2 block text-base text-white sm:text-lg"
              htmlFor="username"
            >
              ASSIGNED TO:
            </label>

            <select
              id="username"
              name="username"
              className="
                w-[100px]
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
              <option value="" disabled>
                Select
              </option>

              {options}
            </select>
          </div>
        </div>
      </form>
    </main>
  );
}

export default NewNoteForm;