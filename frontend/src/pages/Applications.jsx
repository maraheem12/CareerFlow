import React, { useEffect, useState } from "react";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment/moment";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const { user } = useUser();
  const { getToken } = useAuth();

  
const { userData, backendUrl, userApplications, fetchUserData, fetchUserApplicationsData } = useContext(AppContext);
  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);

      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/users/update-resume",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setIsEdit(false);
    setResume(null);
  };



  useEffect(() => {
    if(user){
      fetchUserApplicationsData();
    }
  }, [user]);
  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 max-auto my-10  ">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3 ">
          {isEdit || (userData && userData.resume === "") ? (
            <>
              <label htmlFor="resumeUpload" className=" flex items-center">
                <p className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-lg mr-2 cursor-pointer ">
                  {resume ? resume.name : "Upload Resume"}
                </p>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept="application/pdf"
                  type="file"
                />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button
                onClick={updateResume}
                className="bg-sky-50 cursor-pointer border hover:bg-sky-100 border-blue-500 text-blue-400 rounded-lg px-4 py-2 "
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg "
                href={userData.resume} target="_blank" 
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 border cursor-pointer hover:bg-gray-100 border-gray-300 rounded-lg px-4 py-2 "
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-4 ">Jobs Applied</h2>
        <table className="min-w-full bg-white border-gray-300 border rounded-lg ">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-gray-300 text-left">
                Company
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-left">
                Job Title
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-left max-sm:hidden ">
                Location
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-left max-sm:hidden ">
                Date
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-left">
                Status{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {userApplications?.map((job, index) =>
              true ? (
                <tr key={index}>
                  <td className="py-3 px-4 border-gray-300 flex item-center gap-2 border-b ">
                    <img className="w-8 h-8" src={job.companyId.image} alt="" />
                    {job.companyId.name}
                  </td>
                  <td className="py-2 px-4 border-gray-300 border-b">
                    {job.jobId.title}
                  </td>
                  <td className="py-2 px-4 border-gray-300 border-b max-sm:hidden">
                    {job.jobId.location}
                  </td>
                  <td className="py-2 px-4 border-gray-300 border-b max-sm:hidden">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-2 px-4 border-gray-300 border-b">
                    <span
                      className={`${
                        job.status === "Accepted"
                          ? "bg-green-100"
                          : job.status === "Rejected"
                          ? "bg-red-100"
                          : "bg-blue-100"
                      } px-4 py-1.5 rounded`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Applications;
