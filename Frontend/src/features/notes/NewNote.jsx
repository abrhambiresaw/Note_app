import { useGetUsersQuery } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";

function NewNote() {
  const { isLoading, isError, error, users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id])
    }),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error?.data?.message || "Failed to load users"}</p>;
  }

  if (!users?.length) {
    return <p>No users found</p>;
  }

  return <NewNoteForm users={users} />;
}

export default NewNote;