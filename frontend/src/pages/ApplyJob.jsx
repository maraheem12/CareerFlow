import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext"; // make sure path is correct

const ApplyJob = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);
  const fetchJobs = async () => {
   const data = jobs.filter((job) => job._id === id);
      if (data.length !== 0) {
        setJobData(data);
        console.log(data);
      }
  }

  useEffect(() => {
    if(jobs.length === 0){
      fetchJobs();
    }
  }, [id, jobs]);

  return (
    <div>
      {jobData ? (
        <div>
          <h2>{jobData.title}</h2>
          <p>{jobData.description}</p>
        </div>
      ) : (
        <p>Loading job details...</p>
      )}
    </div>
  );
};

export default ApplyJob;
