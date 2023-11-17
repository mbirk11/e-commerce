/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://api.escuelajs.co/api/v1/users/${id}`
        );
        setUser(res.data);
      } catch (error) {
        console.error("User Data fetching error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {user ? (
        <div className="flex items-center gap-4">
          <img className=" w-10 h-10 rounded-full" src={user.avatar} alt="" />
          <div className=" font-medium dark:text-white">
            <div>Name :{user.name}</div>
            <div>Email :{user.email}</div>
            <div>Role :{user.role}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {user.creationAt}
            </div>
            <button
              type="button"
              className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
            >
              Update user
            </button>
          </div>
        </div>
      ) : (
        <p>Loading User...</p>
      )}
    </>
  );
};

export default UserProfile;
