import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      {/* Company Logo and Job Title */}
      <div className="flex items-center mb-4">
        {/* Placeholder for the company logo */}
        {/* Replace `companyLogo` with your actual image import or path if it's static */}
        <img
          src={assets.google_logo} // Using Google logo as a placeholder demonstration
          alt={`${job.title} Company Logo`}
          className="w-10 h-10 mr-3 object-contain"
        />
        <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
      </div>

      {/* Tags: Location and Experience Level */}
      <div className="flex gap-2 mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
          {job.location}
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-pink-500 border border-red-200">
          {job.level}
        </span>
      </div>

      {/* Job Description */}
      <p
        className="text-gray-600 leading-relaxed mb-6 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-500 cursor-pointer transition-colors duration-200"
        >
          Apply now
        </button>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="bg-white text-gray-800 border border-gray-300 font-medium py-2 px-4 rounded-md cursor-pointer hover:bg-gray-100 transition-colors duration-200"
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

export default JobCard;
