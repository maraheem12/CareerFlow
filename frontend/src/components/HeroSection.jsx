import React from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { assets } from "../assets/assets";
import { Search, MapPin } from "lucide-react";
import { AppContext } from "../context/AppContext";

const HeroSection = () => {
  const { setSearchFilter, setIsSearching } = React.useContext(AppContext);

  const titleRef = React.useRef();
  const locationRef = React.useRef();

  const onSearch = (e) => { 
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearching(true);   
    
    //e.preventDefault();

  }
  const companyLogos = [
    { name: "Accenture", src: assets.accenture_logo },
    { name: "Adobe", src: assets.adope_logo },
    { name: "Amazon", src: assets.amazon_logo },
    { name: "Meta", src: assets.meta_logo },
    { name: "Microsoft", src: assets.microsoft_logo },
    { name: "Netflix", src: assets.netflix_logo },
    // { name: 'Spotify', src: assets.spotify_logo },
    { name: "Tesla", src: assets.tesla_logo },
    // { name: 'Google', src: assets.google_logo },
    { name: "IBM", src: assets.ibm_logo },
    { name: "Intel", src: assets.intel_logo },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight tracking-tight">
          Over{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            10,000+
          </span>{" "}
          jobs to apply
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          Your Next Big Career Move Starts Right Here – Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center w-full bg-white p-2 rounded-full border-2 border-gray-100 shadow-xl focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
            <div className="relative flex-grow w-full md:w-auto flex items-center">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search />
              </div>
              <input
                ref={titleRef}
                type="text"
                placeholder="Job title, keywords, or company"
                className="w-full py-3 pl-12 pr-4 text-gray-700 bg-transparent border-none rounded-full focus:outline-none focus:ring-0"
              />
            </div>
            <div className="w-full md:w-px h-px md:h-8 bg-gray-200 my-2 md:my-0"></div>{" "}
            {/* Divider */}
            <div className="relative flex-grow w-full md:w-auto flex items-center">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <MapPin />
              </div>
              <input
                ref={locationRef}
                type="text"
                placeholder="City, state, or zip code"
                className="w-full py-3 pl-12 pr-4 text-gray-700 bg-transparent border-none rounded-full focus:outline-none focus:ring-0"
              />
            </div>
            <button
              onClick = {onSearch}
              type="submit"
              className="w-full md:w-auto ml-0 md:ml-2 mt-2 md:mt-0 px-6 py-3 h-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <span className="hidden md:block">Search</span>
              <span className="block md:hidden">
                <Search />
              </span>
            </button>
          </div>
        </div>

        <div className="mt-24">
          <p className="text-md font-semibold text-gray-500">
            Powering the world's best teams
          </p>
          <div className="mt-8 flex flex-wrap justify-center items-center gap-x-14 gap-y-8">
            {companyLogos.map((logoName) => (
              <img className="w-19" src={logoName.src} alt={logoName.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
