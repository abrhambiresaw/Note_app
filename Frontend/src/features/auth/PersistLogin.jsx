import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken, setCredentials } from "./authSlice";
import { useDispatch } from "react-redux";

function PersistLogin() {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch()

  const [refresh, { isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (!token && persist) {
      const verifyRefreshToken = async () => {
  try {
    const { accessToken } = await refresh().unwrap();

    dispatch(setCredentials({ accessToken }));
  } catch (err) {
    console.error("Refresh token failed:", err);
  }
};

      verifyRefreshToken();
    }
  }, [token, persist, refresh]);

  if (!persist) {
    return <Outlet />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <p className="mb-2 inline-block bg-white p-1 text-red-800">
        {error?.data?.message} -{" "}
        <Link to="/login">Please login again</Link>.
      </p>
    );
  }

  if (isSuccess || token) {
    return <Outlet />;
  }

  return <p>Loading...</p>;
}

export default PersistLogin;