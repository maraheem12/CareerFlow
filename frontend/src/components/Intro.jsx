import React from 'react'
import { assets, skills } from "../assets/assets";
import { useUser } from "@clerk/clerk-react";
import SkillCard from "./SkillCard.jsx";


const Intro = () => {
    const { user } = useUser();
  return (
    <div>
      <div
        className="h-[20rem] sm:h-[30rem] md:h-[42rem] bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.intro})` }}
      >
        <div className="p-4 sm:px-8 md:px-20 py-35 rounded text-center max-w-2xl flex-col items-center justify-center">
          <h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-black mb-4 animate-pulse">
            Welcome {!user ? "to CareerFlow" : user.firstName}
          </h1>
          <h2 className="text-sm sm:text-lg md:text-2xl font-semibold text-black mb-2 animate-pulse">
            Your next job is just a click away
          </h2>
          <h2 className="text-sm sm:text-lg md:text-2xl text-black mb-1 animate-pulse">
            Find your dream job with just a click —
          </h2>
          <h2 className="text-sm sm:text-lg md:text-2xl text-black animate-pulse">
            explore opportunities tailored to your skills and aspirations.
          </h2>
        </div>
      </div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center  p-4">
        <div className="bg-white w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 rounded-xl">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              My Tech Stack
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              A collection of the technologies, languages, and tools I use.
            </p>
          </div>
          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3"
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            }}
            >
            {skills.map((skill) => (
              <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Intro
