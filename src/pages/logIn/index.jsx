/** @format */
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/authContextProvider";
import { Link, NavLink } from "react-router-dom";
const LogIn = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { logIn, authToken } = useContext(AuthContext);
  const { isAuthed } = authToken;
  const handleLogIn = () => {
    const { email, password } = inputValue;

    if (!isAuthed) {
      logIn(email, password);
    }
  };

  return (
    <>
      <div className="h-screen bg-indigo-100 flex justify-center items-center">
        <div className="lg:w-2/5 md:w-1/2 w-2/3">
          <form className="bg-white p-10 rounded-lg shadow-lg min-w-full">
            <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
              Form Log In
            </h1>
            <div>
              <label
                className="text-gray-800 font-semibold block my-3 text-md"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="text"
                name="email"
                id="email"
                placeholder="email"
                value={inputValue.email}
                onChange={(e) => {
                  setInputValue({ ...inputValue, email: e.target.value });
                }}
              />
            </div>
            <div>
              <label
                className="text-gray-800 font-semibold block my-3 text-md"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={inputValue.password}
                onChange={(e) => {
                  setInputValue({ ...inputValue, password: e.target.value });
                }}
              />
            </div>

            <button
              type="button"
              className="w-full mt-6 mb-3 bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans"
              onClick={handleLogIn}
            >
              Log in
            </button>
            <Link to={"/register"}>
              <div className="text-center text-1xl mb-6 text-blue-500 font-bold font-sans">
                Register Here
              </div>
            </Link>
          </form>
        </div>
      </div>
      ;
    </>
  );
};

export default LogIn;
