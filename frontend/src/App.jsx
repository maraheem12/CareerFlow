import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import Start from "./pages/start";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/apply-job/:id" element={<ApplyJob/>} />
        <Route path="applications" element={<Applications/>} />
      </Routes>
    </div>
  );
}

export default App;
