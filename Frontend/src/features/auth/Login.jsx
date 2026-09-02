import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

import usePersist from "../../hooks/usePersist";

function Login() {
  const userRef = useRef(null);
  const errRef = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { accessToken } = await login({
        username,
        password,
      }).unwrap();

      dispatch(setCredentials({ accessToken }));

      setUsername("");
      setPassword("");

      navigate("/dash");
    } catch (err) {
      if (!err?.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err?.data?.message || "Login failed");
      }

      errRef.current?.focus();
    }
  };

  const handleUserInput = (e) => {
    setUsername(e.target.value);
  };

  const handlePwdInput = (e) => {
    setPassword(e.target.value);
  };
  
  const handleToggle = () => setPersist(prev => !prev)

  const errClass = errMsg
    ? "mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700"
    : "hidden";

  if (isLoading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-lg text-slate-600">Logging in...</p>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Employee Login</h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to access techNotes
          </p>
        </header>

        <main>
          {/* Error message */}
          <p
            ref={errRef}
            className={errClass}
            aria-live="assertive"
            tabIndex="-1"
          >
            {errMsg}
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Username
              </label>

              <input
                className="w-full rounded-md border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                type="text"
                id="username"
                ref={userRef}
                value={username}
                onChange={handleUserInput}
                autoComplete="username"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <input
                className="w-full rounded-md border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                type="password"
                id="password"
                value={password}
                onChange={handlePwdInput}
                autoComplete="current-password"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In
            </button>

    
          </form>
        </main>

        {/* Footer */}
        <footer className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Back to Home
          </Link>
        </footer>
      </div>
    </section>
  );
}

export default Login;
