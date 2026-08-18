import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-Za-z]{3,20}$/;
const PWD_REGEX = /^[A-Za-z0-9!@#$%]{4,12}$/;

function EditUserForm({ user }) {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user?.username ?? "");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user?.roles ?? []);
  const [active, setActive] = useState(user?.active ?? true);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );

    setRoles(values);
  };

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  let canSave;
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const errClass =
    isError || isDelError
      ? "mb-2 inline-block bg-white p-1 text-[firebrick]"
      : "hidden";
  const validUserClass = !validUsername ? "border border-red-500" : "";
  const validPwdClass =
    password && !validPassword ? "border border-red-500" : "";
  const validRolesClass = !roles.length ? "border border-red-500" : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const options = Object.values(ROLES).map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ));

  const content = (
    <>
      <p
        className={
          isError || isDelError
            ? "mb-2 inline-block bg-white p-1 text-[firebrick]"
            : "hidden"
        }
      >
        {errContent}
      </p>

      <form
        className="flex max-w-[800px] flex-col gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex items-center justify-between">
          <h2>Edit User</h2>

          <div className="absolute right-2 flex items-center justify-end gap-2 md:static">
            {/* Save */}
            <button
              className="grid h-12 w-12 place-content-center border-none bg-transparent text-[2.5rem] text-white transition-transform hover:scale-[1.2] focus-visible:scale-[1.2] disabled:invisible"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>

            {/* Delete */}
            <button
              className="grid h-12 w-12 place-content-center border-none bg-transparent text-[2.5rem] text-white transition-transform hover:scale-[1.2] focus-visible:scale-[1.2]"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>

        {/* Username */}
        <label className="text-base" htmlFor="username">
          Username: <span className="whitespace-nowrap">[3-20 letters]</span>
        </label>

        <input
          className={`rounded-[15px] p-2 border ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />

        {/* Password */}
        <label className="text-base" htmlFor="password">
          Password:{" "}
          <span className="whitespace-nowrap">[empty = no change]</span>{" "}
          <span className="whitespace-nowrap">[4-12 chars incl. !@#$%]</span>
        </label>

        <input
          className={`rounded-[15px] p-2 border ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />

        {/* Active */}
        <label className="flex w-fit items-center gap-2" htmlFor="user-active">
          ACTIVE:
          <input
            className="h-6 w-6"
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={active}
            onChange={onActiveChanged}
          />
        </label>

        {/* Roles */}
        <label className="text-base" htmlFor="roles">
          ASSIGNED ROLES:
        </label>

        <select
          id="roles"
          name="roles"
          className={`w-fit p-2 ${validRolesClass}`}
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>
      </form>
    </>
  );

  return content;
}

export default EditUserForm;
