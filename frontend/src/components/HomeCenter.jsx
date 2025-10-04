import React from "react";
import { Link } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import Navbar from "./Navbar";

const HomeCenter = () => {
  const { openSignIn } = useClerk();
  return (
    <div>
      <Navbar />
      <div className=" flex flex-col justify-center items-center text-center gap-6 px-10 h-150 ">
        <h1 className="font-bold text-5xl ">Discover Your Next Opportunity</h1>
        <p className="font-light text-2xl ">
          {" "}
          Explore curated job listings, learning resources, and career
          tools—designed to help you grow, learn, and succeed with confidence.
        </p>
        <button
          className="bg-indigo-500 hover:bg-indigo-700 hover:cursor-pointer  text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
          onClick={() => openSignIn()}
        >
          Explore Jobs
        </button>
      </div>
    </div>
  );
};

export default HomeCenter;
