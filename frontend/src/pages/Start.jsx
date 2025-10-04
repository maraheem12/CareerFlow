import PlacedStudents from "../components/PlacedStudents.jsx";
import Intro from "../components/Intro.jsx";
import Footer from "../components/Footer.jsx";
import Companies from "../components/Companies.jsx";
import  Advantages  from "../components/Advantages.jsx";
import Steps from "../components/Steps.jsx";
import Navbar from '../components/Navbar'

const Start = () => {
  
  return (
    <div>
      <Navbar/>
      <Intro />
      <Advantages />
      <Companies/>
      <Steps/>
      <PlacedStudents/>
    </div>
  );
};

export default Start;
