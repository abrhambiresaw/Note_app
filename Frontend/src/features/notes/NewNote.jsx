import { useSelector } from "react-redux";
import { selectAllUsers, useGetUsersQuery } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";

function NewNote() {
  const users = useSelector(selectAllUsers);
  const { isLoading, isError, error } = useGetUsersQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error?.data?.message || "Failed to load users"}</p>;
  }

  if (!users.length) {
    return <p>No users found</p>;
  }

  return <NewNoteForm users={users} />;
}

export default NewNote;