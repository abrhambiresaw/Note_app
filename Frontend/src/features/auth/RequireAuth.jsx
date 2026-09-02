import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

function RequireAuth({ allowedRoles }) {
  const location = useLocation();
  const token = useSelector(selectCurrentToken);
  const { roles } = useAuth();

  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return roles.some((role) => allowedRoles.includes(role))
    ? <Outlet />
    : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;