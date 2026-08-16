import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-Za-z]{3,20}$/;
const PWD_REGEX = /^[A-Za-z0-9!@#$%]{4,12}$/;

function NewUserForm() {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    setRoles(values);
  };

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const errClass = isError ? "mb-2 inline-block bg-white p-1 text-[firebrick]" : "hidden";
  const validUserClass = !validUsername ? "border border-red-500" : "";
  const validPwdClass = !validPassword ? "border border-red-500" : "";
  const validRolesClass = roles.length
    ? "border border-red-500"
    : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="flex max-w-[800px] flex-col gap-3" onSubmit={onSaveUserClicked}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">New User</h2>
          <div className="absolute right-2 flex justify-end items-center gap-2 md:static">
            <button className="grid h-12 w-12 place-content-center border-none bg-transparent text-[2.5rem] text-white transition-transform hover:scale-[1.2] focus-visible:scale-[1.2] disabled:invisible" title="Save" 
            disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="text-base" htmlFor="username">
          Username: <span className="whitespace-nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`rounded-[15px] p-2 ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />

        <label className="text-base" htmlFor="password">
          Password: <span className="whitespace-nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`rounded-[15px] p-2 ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />

        <label className="text-base" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <select
          id="roles"
          name="roles"
          className={`w-fit p-1 ${validRolesClass}`}
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

export default NewUserForm;
