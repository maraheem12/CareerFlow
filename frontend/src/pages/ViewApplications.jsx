// import React, { useEffect, useState } from "react";
// import { assets, viewApplicationsPageData } from "../assets/assets";
// import { useContext } from "react";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Loading from "../components/Loading";

// const ViewApplications = () => {
//   const { backendUrl, companyToken } = useContext(AppContext);
//   const [applicants, setApplicants] = useState(null);

//   const fetchCompanyJobApplications = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/company/applicants", {
//         headers: { token: companyToken },
//       });

//       if (data.success) {
//         setApplicants(data.applications.reverse());
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (companyToken) {
//       fetchCompanyJobApplications();
//     }
//   }, [companyToken]);
//   return applicants ? applicants.length === 0 ? (<div></div>):(
//       <div className="container mx-auto p-4">
//         <div className="overflow-x-auto">
//           <table className="w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm">
//             <thead>
//               <tr className="border-b border-gray-200">
//                 <th className="py-2 px-4 text-left">#</th>
//                 <th className="py-2 px-4 text-left">User Name</th>
//                 <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
//                 <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
//                 <th className="py-2 px-4 text-left">Resume</th>
//                 <th className="py-2 px-4 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
//                 <tr key={index} className="text-gray-800 ">
//                   <td className="py-2 px-4 border-b border-gray-200 text-center">
//                     {index + 1}
//                   </td>
//                   <td className="py-2 px-4 border-b text-center border-gray-200 flex items-center">
//                     <img
//                       className="w-10 h-10 rounded-full mr-3 max-sm:hidden"
//                       src={applicant.userId.image}
//                       alt=""
//                     />
//                     <span>{applicant.userId.name}</span>
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-200 text-center max-sm:hidden">
//                     {applicant.jobId.jobTitle}
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-200 text-center max-sm:hidden">
//                     {applicant.jobId.location}
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-200">
//                     <a
//                       href={applicant.userId.resume}
//                       target="_blank"
//                       className="bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center"
//                     >
//                       Resume <img src={assets.resume_download_icon} alt="" />
//                     </a>
//                   </td>
//                   <td className="py-2 border-gray-200 px-4 border-b relative">
//                     <div className="relative inline-block text-left group">
//                       <button className="text-gray-500 action-button">
//                         ...
//                       </button>
//                       <div className="z-10 hidden absolute right-0 left-0 top-0 mt-2 w-32 bg-white border-gray-200 rounded shadow group-hover:block">
//                         <button className="block w-full text-left px-4 py-2 text-blue-100 hover:bg-gray-100">
//                           Accept
//                         </button>
//                         <button className="block w-full text-left px-4 py-2 text-red-100 hover:bg-gray-100">
//                           Reject
//                         </button>
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//   ): <Loading />;
// };

// export default ViewApplications;
import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets"; // Assuming you might use this later
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  // Change initial state to null to represent "data has not been fetched yet"
  const [applicants, setApplicants] = useState(null);

  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/applications",
        {
          headers: { token: companyToken },
        }
      );

      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
        setApplicants([]);
      }
    } catch (error) {
      toast.error(error.message);
      setApplicants([]);
    }
  };

  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-status",
        { id, status },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        fetchCompanyJobApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  if (applicants === null) {
    return <Loading />;
  }

  if (applicants.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-500">
        <h2>No Applications Available</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">User Name</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 text-left">Resume</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants
              .filter((item) => item.jobId && item.userId)
              .map((applicant, index) => (
                <tr key={index} className="text-gray-800 ">
                  <td className="py-2 px-4 border-b border-gray-200 text-center">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b text-center border-gray-200 flex items-center">
                    <img
                      className="w-10 h-10 rounded-full mr-3 max-sm:hidden"
                      src={applicant.userId.image}
                      alt=""
                    />
                    <span>{applicant.userId.name}</span>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-center max-sm:hidden">
                    {/* Make sure your populated data has a title, not jobTitle */}
                    {applicant.jobId.title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-center max-sm:hidden">
                    {applicant.jobId.location}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <a
                      href={applicant.userId.resume}
                      target="_blank"
                      rel="noopener noreferrer" // Good practice for security
                      className="bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center"
                    >
                      Resume <img src={assets.resume_download_icon} alt="" />
                    </a>
                  </td>
                  <td className="py-2 border-gray-200 px-4 border-b relative">
                    {applicant.status === 'Pending' ? (
                      <div className="relative inline-block text-left group">
                        <button className="text-gray-500 action-button">
                          ...
                        </button>
                        <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg group-hover:block">
                          <button
                            onClick={() => {
                              changeJobApplicationStatus(
                                applicant._id,
                                "Accepted"
                              );
                            }}
                            className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => {
                              changeJobApplicationStatus(
                                applicant._id,
                                "Rejected"
                              );
                            }}
                            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>{applicant.status}</div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
