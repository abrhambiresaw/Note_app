import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import EditUserForm from "./EditUserForm"
import { useGetUsersQuery } from "./usersApiSlice"
import { selectUserById } from "./usersApiSlice"

function EditUser() {
  const { id } = useParams()

  const { isLoading } = useGetUsersQuery("userList");

  const user = useSelector(state => selectUserById(state, id))

   if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return <EditUserForm user={user} />;
}

export default EditUser