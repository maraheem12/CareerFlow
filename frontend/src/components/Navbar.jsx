import React from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  return (
    <div className=" sticky top-0 shadow py-4 bg-white/80 backdrop-blur z-50 shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center ">
        <img src={assets.logo} width="90" alt="" />

        {user ? (
          <div className="flex items-center gap-4" > 
            <Link className="hover:bg-gray-300 rounded-4xl px-4 p-2" to="/applications" > Applied Jobs</Link>
            <p>|</p>
            <p>Hi {user.firstName}</p>
            <UserButton/></div>
        ) : (
          <div className="flex gap-4 max-sm:text-sm">
            <button className="text-gray-600 cursor-pointer ">
              Recruiter Login
            </button>
            <button
              onClick={openSignIn()}
              className="bg-blue-600 cursor-pointer  text-white px-6 sm:px-9 py-2 rounded-2xl "
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
