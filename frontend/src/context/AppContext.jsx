import { createContext, useEffect } from "react";
import { useState } from "react";
import { JobCategories, jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

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
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/company`, {
        headers: { token: companyToken },
      });
      if (data.success) {
        setCompanyData(data.company);
        console.log("Fetched company data:", data.company); 
        toast.success("Company data fetched successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
      toast.error("Failed to fetch company data");
    }
  };
  useEffect(() => {
    fetchJobs();
    const storedCompanyToken = localStorage.getItem("companyToken");

    // If a token is found, it means the company was previously logged in.
    if (storedCompanyToken) {
      // Update the application's state with the found token.
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

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
