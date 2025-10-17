import React, { useEffect } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";



const DashBoard = () => {
  const navigate = useNavigate();

  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);
  const logout = () => {
    setCompanyData(null);
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    navigate("/");
  }
  useEffect(() => {
    if(companyData){
      navigate("/dashboard/manage-jobs");
    }
  }, [companyData]);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Header */}
      <div className="shadow py-4 backdrop-blur z-50">
        <div className="flex px-5 justify-between items-center">
          <button
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0); // Use window.scrollTo
            }}
            className="text-2xl cursor-pointer gap-2 flex font-bold items-center"
          >
            <img className="w-10 h-10" src="/careerFlow_Logo.jpg" alt="Logo" />
            <div className="flex">
              <p>Career</p>
              <p className="text-blue-500">Flow</p>
            </div>
          </button>
          {companyData && (
            <div className="flex items-center gap-3">
              <p className="max-sm:hidden">Welcome {companyData.name}</p>
              <div className="relative group">
                <img
                  className="w-8 border rounded-full"
                  src={companyData.image}
                  alt="Profile"
                />
                <div className="absolute hidden group-hover:block top-full right-0 z-10 text-black rounded pt-2">
                  <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                    <li onClick={logout} className="py-1 px-2 cursor-pointer pr-10">Logout</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area with Sidebar and Outlet */}
      <div className="flex flex-1">
        {/* Left Sidebar for Recruiter */}
        <div className="border-r-2 bg-white">
          <ul className="flex flex-col items-start pt-5 text-gray-800">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to="/dashboard/add-job"
            >
              <img className="min-w-4" src={assets.add_icon} alt="" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to="/dashboard/manage-jobs"
            >
              <img className="min-w-4" src={assets.home_icon} alt="" />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to="/dashboard/view-applications"
            >
              <img className="min-w-4" src={assets.person_tick_icon} alt="" />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>

        {/* Content Area for Nested Routes */}
        <div className="flex-1 p-8 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

// import React from "react";
// import { Outlet } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { useNavigate, NavLink } from "react-router-dom";

// const DashBoard = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="min-h-screen">
//       {/* <Navbar/> */}
//       <div className="shadow py-4  ">
//         <div className=" flex px-5 justify-between item-center ">
//           <button
//             onClick={() => {
//               navigate("/");
//               scrollTo(0, 0);
//             }}
//             className="text-2xl cursor-pointer gap-2 flex font-bold  "
//           >
//             <img className="w-10 h-10" src="/careerFlow_Logo.jpg" alt="Logo" />
//             <div className="flex">
//               <p className=" = ">Career</p>
//               <p className=" text-blue-500 ">Flow</p>
//             </div>
//           </button>
//           <div className="flex item-center gap-3">
//             <p className="max-sm:hidden">Welcome</p>
//             <div className="relative group">
//               <img
//                 className="w-8 border rounded-full"
//                 src={assets.company_icon}
//                 alt=""
//               />
//               <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
//                 <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm  ">
//                   <li className="py-1 px-2 cursor-pointer pr-10"> Logout</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className=" inline-block min-h-screen border-r-2  " >
//             {/*Left Side Bar for Recruiter*/}
//             <ul className="flex flex-col item-start pt-5 text-gray-800  " >
//                 <NavLink
//                 className={ ({isActive}) => `flex item-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100   ${isActive && `bg-blue-100 border-r-4 border-blue-500 `    }  ` }
//                 to="/dashboard/add-job">
//                     <img className="min-w-4  " src={assets.add_icon} alt="" />
//                     <p className="max-sm:hidden" >Add Job</p>
//                 </NavLink>
//                 <NavLink
//                 className={ ({isActive}) => `flex item-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100   ${isActive && `bg-blue-100 border-r-4 border-blue-500 `    }  ` }
//                 to="/dashboard/manage-jobs">
//                     <img className="min-w-4  " src={assets.home_icon} alt="" />
//                     <p className="max-sm:hidden" >Manage Jobs</p>
//                 </NavLink>
//                 <NavLink
//                 className={ ({isActive}) => `flex item-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100   ${isActive && `bg-blue-100 border-r-4 border-blue-500 `    }  ` }
//                 to="/dashboard/view-applications">
//                     <img className="min-w-4  " src={assets.person_tick_icon} alt="" />
//                     <p className="max-sm:hidden" >View Applications</p>
//                 </NavLink>
//             </ul>
//       </div>
//       <div>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default DashBoard;
