import { useParams } from "react-router-dom"
import EditUserForm from "./EditUserForm"
import { useGetUsersQuery } from "./usersApiSlice"

function EditUser() {
  const { id } = useParams()

  const { isLoading, user } = useGetUsersQuery("userList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id]
    }),
  })


   if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return <EditUserForm user={user} />;
}

export default EditUser