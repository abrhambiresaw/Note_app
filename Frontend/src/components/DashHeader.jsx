import { useNavigate, Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";

import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

function DashHeader() {
  const { isManager, isAdmin } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isError, error }] = useSendLogoutMutation();

  const onNewNoteClicked = () => navigate("/dash/notes/new");

  const onNewUserClicked = () => navigate("/dash/users/new");

  const onNotesClicked = () => navigate("/dash/notes");

  const onUsersClicked = () => navigate("/dash/users");

  const onLogoutClicked = async () => {
    try {
      await sendLogout().unwrap();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  let dashClass = "";

  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "max-w-7xl mx-auto";
  }

  let newNoteButton = null;

  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        type="button"
        className="rounded-md p-2 text-white transition hover:bg-slate-700"
        title="New Note"
        aria-label="New Note"
        onClick={onNewNoteClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }

  let newUserButton = null;

  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        type="button"
        className="rounded-md p-2 text-white transition hover:bg-slate-700"
        title="New User"
        aria-label="New User"
        onClick={onNewUserClicked}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }

  let userButton = null;

  if (
    (isManager || isAdmin) &&
    !USERS_REGEX.test(pathname) &&
    pathname.includes("/dash")
  ) {
    userButton = (
      <button
        type="button"
        className="rounded-md p-2 text-white transition hover:bg-slate-700"
        title="Users"
        aria-label="Users"
        onClick={onUsersClicked}
      >
        <FontAwesomeIcon icon={faUserGear} />
      </button>
    );
  }

  let notesButton = null;

  if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
    notesButton = (
      <button
        type="button"
        className="rounded-md p-2 text-white transition hover:bg-slate-700"
        title="Notes"
        aria-label="Notes"
        onClick={onNotesClicked}
      >
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  const logoutButton = (
    <button
      type="button"
      className="rounded-md p-2 text-white transition hover:bg-slate-700"
      title="Logout"
      aria-label="Logout"
      onClick={onLogoutClicked}
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  let buttonContent;

  if (isLoading) {
    buttonContent = <p className="text-white">Logging Out...</p>;
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {userButton}
        {logoutButton}
      </>
    );
  }

  return (
    <>
      {isError && (
        <p className="mb-2 inline-block bg-white p-1 text-[firebrick]">
          {error?.data?.message || "Logout failed"}
        </p>
      )}

      <header className="sticky top-0 z-10 border-b border-white bg-slate-900">
        <div
          className={`flex items-center justify-between px-4 py-3 ${dashClass}`}
        >
          <Link to="/dash">
            <h1 className="text-2xl font-bold text-white">techNotes</h1>
          </Link>

          <nav className="flex items-center justify-end gap-2">
            {buttonContent}
          </nav>
        </div>
      </header>
    </>
  );
}

export default DashHeader;
