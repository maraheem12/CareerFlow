import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import Start from "./pages/Start";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DashBoard from "./pages/DashBoard.jsx";
import AddJob from "./pages/AddJob.jsx";
import ManageJobs from "./pages/ManageJobs.jsx";
import ViewApplications from "./pages/ViewApplications.jsx";


import Footer from "./components/Footer.jsx";
import RecruiterLogin from "./components/RecruiterLogin.jsx";


import { AppContext } from "./context/AppContext.jsx";
import { useContext } from "react";


import "quill/dist/quill.snow.css";

function App() {
  const { showRecruiterLogin } = useContext(AppContext);

  return (
    <div>
      
      <main className="flex-grow">
        {showRecruiterLogin && <RecruiterLogin />}
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply-job/:id" element={<ApplyJob />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/dashboard" element={<DashBoard />} >
            <Route path="add-job" element={<AddJob/>} />
            <Route path="manage-jobs" element={<ManageJobs />} />
            <Route path="view-applications" element={<ViewApplications />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
