import { useParams } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import useAuth from "../../hooks/useAuth";

function EditNote() {
  const { id } = useParams();

  const { username, isManager, isAdmin } = useAuth();

  const { note, isLoading: isNoteLoading } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data, isLoading }) => ({
      note: data?.entities[id],
      isLoading,
    }),
  });

  const { users, isLoading: isUsersLoading } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data, isLoading }) => ({
      users: data?.ids.map((id) => data.entities[id]),
      isLoading,
    }),
  });

  if (isNoteLoading || isUsersLoading) {
    return <p>Loading...</p>;
  }

  if (!note) {
    return <p>Note not found</p>;
  }

  if (!isManager && !isAdmin && note.username !== username) {
    return (
      <p className="mb-2 inline-block bg-white p-1 text-[firebrick]">
        No access
      </p>
    );
  }

  return <EditNoteForm note={note} users={users} />;
}

export default EditNote;