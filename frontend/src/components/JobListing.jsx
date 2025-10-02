import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";
import { Link } from "react-router-dom";

const JobListing = () => {
  const { isSearching, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);

  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  return (
    <div className=" gap-2 w-full 2xl:px-20 flex flex-col lg:flex-row max-lg:space-y-8 px-10 py-8">
      {/* This is the main content area for your job listings and filters */}
      <div className="w-full lg:w-65 px-4  ">
        {/* Conditional container for displaying current search filters */}
        {isSearching &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-6">
              <h2 className="text-md font-semibold text-gray-800 mb-3">
                Current Search
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                {/* Display and clear button for title */}
                {searchFilter.title && (
                  <div className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium pl-3 pr-2 py-1 border-2 rounded-2xl">
                    <span>{searchFilter.title}</span>
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      src={assets.cross_icon}
                      alt="clear title filter"
                      className="w-4 h-4 ml-2 cursor-pointer hover:opacity-75"
                    />
                  </div>
                )}

                {/* Display and clear button for location */}
                {searchFilter.location && (
                  <div className="flex items-center bg-green-100 text-green-800 text-sm font-medium pl-3 pr-2 py-1 border-2 rounded-2xl">
                    <span>{searchFilter.location}</span>
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({
                          ...prev,
                          location: "",
                        }))
                      }
                      src={assets.cross_icon}
                      alt="clear location filter"
                      className="w-4 h-4 ml-2 cursor-pointer hover:opacity-75"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

        <button
          onClick={(e) => setShowFilters(!showFilters)}
          className="px-6 py-1.5 rounded border-4 border-gray-400 font-bold text-gray-700 hover:bg-gray-100 transition-all mb-6 lg:hidden"
        >
          {showFilters ? "Close" : "Filters"}
        </button>

        {/* Categroy Filter*/}

        <div className={showFilters ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4  ">Search by Categories</h4>
          <ul className="space-y-4  text-gray-600 ">
            {JobCategories.map((category, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input className="scale-125" type="checkbox" name="" id="" />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Location Filter */}

        <div className={showFilters ? "" : "max-lg:hidden"}>
          <h4 className="pt-12 font-medium text-lg py-4  ">
            Search by Location
          </h4>
          <ul className="space-y-4  text-gray-600 ">
            {JobLocations.map((location, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input className="scale-125" type="checkbox" name="" id="" />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Job Listings Area */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4  ">
        <h2 className="text-3xl font-medium py-2" id="job-list">
          Latest Jobs
        </h2>
        <p className="mb-8">Get your desired job from top companies</p>
        <div className="grid  grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-4 ">
          {/* Job listings will be rendered here */}
          {jobs.slice((currentPage-1)*6, currentPage*6).map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
        {/* Pagination Controls */}
        {jobs.length > 0 && (
          <div className="flex item-center justifiy-center space-x-2 mt-10  ">
            <a href="#job-list">
      
              <img 
              onClick={() => Math.max(1, currentPage - 1)}
              src={assets.left_arrow_icon} alt="" />
            </a>
            {Array.from({ length: Math.ceil(jobs.length / 6) }).map(
              (_, index) => (
                <a href="#job-list" key={index}>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 items-center justify-center border border-gray-300 rounded ${
                      currentPage == index + 1
                        ? "bg-blue-100 text-blue-500 "
                        : "text-gray-500"
                    } `}
                  >
                    {index + 1}
                  </button>
                </a>
              )
            )}

            <a href="#job-list">
              <img 
              onClick={() => Math.max(currentPage + 1, Math.ceil(jobs.length / 6))}
              src={assets.right_arrow_icon} alt="" />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
