import { useSelector } from "react-redux"
import { selectAllUsers } from "../users/usersApiSlice"
import NewUserForm from "../users/NewUserForm"

function NewNote() {
  const users = useSelector(selectAllUsers)

  const content = users ? <NewUserForm users={users} /> : <p>Loading...</p>

  return content
}

export default NewNote