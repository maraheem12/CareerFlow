import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import { Briefcase, MapPin, User, CircleDollarSign } from "lucide-react";
import { assets, jobsData } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../components/JobCard";

const ApplyJob = () => {
  const { id } = useParams();
  // FIX 1: Initialize state to null to represent the "loading" state correctly.
  const [jobData, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);

  useEffect(() => {
    // FIX 3: The logic should execute when the 'jobs' array is populated.
    if (jobs.length > 0) {
      const data = jobs.filter((job) => job._id === id);

      if (data.length > 0) {
        // FIX 2: Set the state to the first (and only) job object, not the array.
        setJobData(data[0]);
      }
    }
    // This effect runs whenever the job 'id' or the 'jobs' list changes.
  }, [id, jobs]);

  // Render a loading component until jobData is populated.
  if (!jobData) {
    return <Loading />;
  }

  // If jobData exists, render the job details.
  return (
    <div className="min-h-screen flex flex-col py-10 px-4 container 2xl:px-20 mx-auto  ">
      <div className=" bg-white text-black rounded-lg w-full">
        <div className=" flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl ">
          <div className="flex flex-col md:flex-row item-center ">
            <img
              className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border   "
              src={assets.company_icon}
              alt=""
            />
            <div className=" text-center md:text-left text-neutral-700 ">
              <h1 className="text-2xl sm:text-4xl font-medium   ">
                {jobData.title}
              </h1>
              <div className=" flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center  text-gray-600 mt-2 ">
                <span className=" flex items-center gap-1 ">
                  <img src={assets.suitcase_icon} alt="" />
                  {jobData.companyId.name}
                </span>
                <span className=" flex items-center gap-1 ">
                  <img src={assets.location_icon} alt="" />
                  {jobData.location}
                </span>
                <span className=" flex items-center gap-1 ">
                  <img src={assets.person_icon} alt="" />
                  {jobData.level}
                </span>
                <span className=" flex items-center gap-1 ">
                  <img src={assets.money_icon} alt="" />
                  CTC: {kconvert.convertTo(jobData.salary)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center  ">
            <button className=" bg-blue-600 p-2.5 px-10 text-white rounded cursor-pointer hover:bg-blue-500  ">
              Apply Now
            </button>
            <p className="mt-1 text-gray-600  ">
              Posted {moment(jobData.date).fromNow()} ago
            </p>
          </div>
        </div>
      </div>

      <div className=" flex flex-col lg:flex-row justify-between items-start  ">
        <div className=" w-full lg:w-2/3 ">
          <h2 className=" font-bold  text-2xl mb-4 ">Job description</h2>
          <div
            className="rich-text  "
            dangerouslySetInnerHTML={{ __html: jobData.description }}
          ></div>
          <button className=" bg-blue-600 p-2.5 px-10 mt-15 cursor-pointer hover:bg-blue-500 text-white rounded ">
            Apply Now
          </button>
        </div>
        {/* Right Side jobs */}
        <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5 ">
          <h2 className="font-bold text-xl mb-4">
            More Jobs from {jobData.companyId.name}
          </h2>
          {jobs
            .filter(
              (job) =>
                job._id !== jobData._id &&
                job.companyId._id === jobData.companyId._id
            )
            .slice(0, 4)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
