/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Api from "../../utils/Api";
import { AuthContext } from "../../providers/authContextProvider";
import ProfileForm from "./UserProfeleForm";
import Header from "../../components/header";

const UserProfile = () => {
  const { authToken } = useContext(AuthContext);
  const id = authToken.user.id;

  const [user, setUser] = useState(null);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await Api.get(`/users/${id}`);
        setUser(res.data);
      } catch (error) {
        console.error("User Data fetching error:", error);
      }
    }

    fetchData();
  }, [id]);

  return (
    <>
      <Header />
      {user ? (
        <div className="flex items-center gap-4">
          <div className="flex-1 p-20">
            <img className=" w-30 h-30 rounded-full" src={user.image} alt="" />
            <div className=" font-medium dark:text-white">
              <div>Last Name :{user.lastName}</div>
              <div>First Name :{user.firstName}</div>
              <div>Email :{user.email}</div>
              <div>BirthDate:{user.birthDate}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {user.creationAt}
              </div>
              <button
                onClick={() => {
                  setToggle(true);
                }}
                type="button"
                className=" mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
              >
                Update user
              </button>
            </div>
          </div>
          <div className="flex-1 p-20">
            {toggle ? (
              <ProfileForm toggle={setToggle} email={user.email} />
            ) : null}
          </div>
        </div>
      ) : (
        <p>Loading User...</p>
      )}
    </>
  );
};

export default UserProfile;
