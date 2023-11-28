/** @format */

import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router";
import Api from "../utils/Api";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", { token: null });
  const navigate = useNavigate();
  async function signUp(firstName, username, password) {
    try {
      const userData = await Api.post("/users/add", {
        firstName: firstName,
        username: username,
        password: password,
      });
      alert(`თქვენ წარმატებით გაიარეთ რეგისტრაცია`);
      console.log(userData.data);

      navigate("/login");
    } catch (e) {
      console.log("error:", e);
    }
  }
  async function logIn(username, password) {
    try {
      const tokenRes = await Api({
        method: "post",
        url: "/auth/login",
        data: {
          username: username,
          password: password,
        },
      });

      setAuth({
        token: tokenRes.data.token,
        user: tokenRes.data,
      });

      navigate("/products");
    } catch (e) {
      console.log("error:", e);
    }
  }
  function logOut() {
    setAuth("auth", { token: null });
  }
  const authToken = { ...auth, isAuthed: !!auth.token };
  return (
    <AuthContext.Provider value={{ authToken, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
