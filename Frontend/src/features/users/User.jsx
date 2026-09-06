import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import { memo } from "react";

function User({ userId }) {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const navigate = useNavigate();

  if (!user) return null;

  const handleEdit = () => navigate(`/dash/users/${userId}`);

  const userRolesString = user.roles.toString().replaceAll(",", ", ");

  const cellStatus = user.active ? "bg-white" : "bg-[lightgray]";

  return (
    <tr className="contents">
      <td className={`${cellStatus} text-left border border-black p-2`}>
        {user.username}
      </td>

      <td className={`${cellStatus} text-left border border-black p-2`}>
        {userRolesString}
      </td>

      <td
        className={`${cellStatus} text-left border border-black p-2 grid place-content-center`}
      >
        <button
          className="w-12 h-12 text-[2.5rem] bg-transparent border-0 text-black grid place-content-center hover:scale-[1.2] focus-visible:scale-[1.2] transition-transform"
          title="Edit"
          onClick={handleEdit}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
  );
}

const memoizedUser = memo(User);
export default memoizedUser;
