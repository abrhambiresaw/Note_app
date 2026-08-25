import { useNavigate, Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

function DashHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isError, error }] = useSendLogoutMutation();

  const onLogoutClicked = async () => {
    try {
      await sendLogout().unwrap();

      // Go to home page after successful logout
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (isLoading) {
    return <p className="p-4 text-center">Logging out...</p>;
  }

  if (isError) {
    return (
      <p className="p-4 text-center text-red-600">
        Error: {error?.data?.message || "Logout failed"}
      </p>
    );
  }

  let dashClass = "";

  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "max-w-7xl mx-auto";
  }

  return (
    <header className="sticky top-0 z-10 border-b border-slate-700 bg-slate-900">
      <div
        className={`flex items-center justify-between px-4 py-3 ${dashClass}`}
      >
        <Link to="/dash">
          <h1 className="text-2xl font-bold text-white">techNotes</h1>
        </Link>

        <nav>
          <button
            type="button"
            className="rounded-md p-2 text-white transition hover:bg-slate-700"
            title="Logout"
            aria-label="Logout"
            onClick={onLogoutClicked}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </nav>
      </div>
    </header>
  );
}

export default DashHeader;
