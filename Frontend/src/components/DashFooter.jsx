import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

function DashFooter() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button
        className="w-12 h-12 text-[2.5rem] bg-transparent border-0 text-white grid place-content-center hover:scale-[1.2] focus-visible:scale-[1.2] transition-transform text-base"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHome} />
      </button>
    );
  }

  return (
    <footer className="sticky bottom-0 z-[1] bg-slate-900 border-t p-2 border-white flex justify-start items-center gap-4 text-base">
      {goHomeButton}
      <p>Current User:</p>
      <p>Status:</p>
    </footer>
  );
}

export default DashFooter;
