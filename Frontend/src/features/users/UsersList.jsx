import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";

function UsersList() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = (
      <p className="inline-block bg-white text-[firebrick] p-1 mb-2">
        {error?.data?.message}
      </p>
    );
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;


    content = (
      <table className="text-base w-full grid grid-cols-[1fr_2fr_1fr] text-black gap-[0.1em]">
        <thead className="contents sticky top-0 z-[1]">
          <tr className="contents bg-white  text-left">
            <th
              scope="col"
              className=" border border-black p-2"
            >
              Username
            </th>

            <th
              scope="col"
              className=" border border-black p-2"
            >
              Roles
            </th>

            <th
              scope="col"
              className=" border border-black p-2"
            >
              Edit
            </th>
          </tr>
        </thead>

        <tbody className="contents">{tableContent}</tbody>
      </table>
    );
  }

  return content;
}

export default UsersList;
