import React from "react";
import { Outlet } from "react-router-dom";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      {/* <Navbar/> */}
      <div className="shadow py-4  ">
        <div className=" flex px-5 justify-between item-center ">
          <button
            onClick={() => {
              navigate("/");
              scrollTo(0, 0);
            }}
            className="text-2xl cursor-pointer gap-2 flex font-bold  "
          >
            <img className="w-10 h-10" src="/careerFlow_Logo.jpg" alt="Logo" />
            <div className="flex">
              <p className=" = ">Career</p>
              <p className=" text-blue-500 ">Flow</p>
            </div>
          </button>
          <div className="flex items-center gap-3">
            <p className="max-sm:hidden">Welcome</p>
            <div className="relative group">
              <img
                className="w-8 border rounded-full"
                src={assets.company_icon}
                alt=""
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-mg border text-sm  ">
                  <li className="py-1 px-2 cursor-pointer pr-10"> Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default DashBoard;
