import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetNotesQuery } from "./notesApiSlice";
import { memo } from "react";

function Note({ noteId }) {
  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });

  const navigate = useNavigate();

  if (!note) return null;

  const created = new Date(note.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const updated = new Date(note.updatedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const handleEdit = () => navigate(`/dash/notes/${noteId}`);

  return (
    <tr className="contents">
      <td
        className={`border border-black bg-white p-2 font-bold ${
          note.completed ? "text-[limegreen]" : "text-[firebrick]"
        }`}
      >
        {note.completed ? "Completed" : "Open"}
      </td>

      <td className="hidden border border-black bg-white p-2 md:block">
        {created}
      </td>

      <td className="hidden border border-black bg-white p-2 md:block">
        {updated}
      </td>

      <td className="border border-black bg-white p-2">{note.title}</td>

      <td className="hidden border border-black bg-white p-2 md:block">
        {note.username}
      </td>

      <td className="grid place-content-center border border-black bg-white p-2">
        <button
          className="grid h-12 w-12 place-content-center border-0 bg-transparent text-[2.5rem] text-black transition-transform hover:scale-[1.2] focus-visible:scale-[1.2]"
          onClick={handleEdit}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
  );
}

const memoizedNote = memo(Note)
export default memoizedNote;
