import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";

const NotesList = () => {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery('notesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = notes;

    const tableContent = ids?.length
      ? ids.map((noteId) => <Note key={noteId} noteId={noteId} />)
      : null;

    content = (
      <table className="grid w-full grid-cols-[1fr_2fr_1fr] gap-[0.1em] text-base text-black md:grid-cols-[repeat(3,1fr)_2fr_repeat(2,1fr)] md:text-2xl">
        <thead className="sticky top-0 z-[1] contents">
          <tr className="contents">
            <th
              scope="col"
              className="border border-black bg-white p-2 text-left"
            >
              Status
            </th>
            <th
              scope="col"
              className="hidden border border-black bg-white p-2 text-left md:block"
            >
              Created
            </th>
            <th
              scope="col"
              className="hidden border border-black bg-white p-2 text-left md:block"
            >
              Updated
            </th>
            <th
              scope="col"
              className="border border-black bg-white p-2 text-left"
            >
              Title
            </th>
            <th
              scope="col"
              className="hidden border border-black bg-white p-2 text-left md:block"
            >
              Owner
            </th>
            <th
              scope="col"
              className="border border-black bg-white p-2 text-lefttable__th note__edit"
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
};
export default NotesList;
