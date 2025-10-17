import { createContext, useEffect } from "react";
import { useState } from "react";
import { JobCategories, jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
    categories: [],
    locations: [],
  });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isSearching, setIsSearching] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const fetchJobs = async () => {
    setJobs(jobsData);
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  const value = {
    searchFilter,
    setSearchFilter,

    isSearching,
    setIsSearching,

    jobs,
    setJobs,

    companyToken,
    setCompanyToken,

    companyData,
    setCompanyData,

    showRecruiterLogin,
    setShowRecruiterLogin,

    backendUrl,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
