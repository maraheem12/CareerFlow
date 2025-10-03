import { createContext, useEffect } from "react";
import { useState } from "react";
import { JobCategories, jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
    categories: [],
    locations: []
  });

  const [isSearching, setIsSearching] = useState(false);
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async () => {
    setJobs(jobsData);
  };
  useEffect(() => {
    fetchJobs();
  },[]);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearching,
    setIsSearching,
    jobs,
    setJobs,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
