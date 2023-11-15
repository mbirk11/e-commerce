/** @format */

import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", { token: null });
  const navigate = useNavigate();
  async function signUp(name, email, password, avatar) {
    try {
      const userData = await axios.post(
        "https://api.escuelajs.co/api/v1/users/",
        {
          name: name,
          email: email,
          password: password,
          avatar: "https://picsum.photos/800",
        }
      );

      console.log(userData.data);

      navigate("/login");
    } catch (e) {
      console.log("error:", e);
    }
  }
  async function logIn(email, password) {
    try {
      const tokenRes = await axios({
        method: "post",
        url: " https://api.escuelajs.co/api/v1/auth/login",
        data: {
          email: email,
          password: password,
        },
      });
      console.log("tokenRes", tokenRes);
      const userRes = await axios({
        method: "get",
        url: "https://api.escuelajs.co/api/v1/auth/profile",
        headers: {
          Authorization: `Bearer ${tokenRes.data.access_token}`,
        },
      });
      setAuth({
        token: tokenRes.data.access_token,
        user: userRes.data,
      });
      console.log(userRes.data);

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
