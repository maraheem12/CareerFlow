import React from "react";
import { assets, skills } from "../assets/assets";
import { useUser } from "@clerk/clerk-react";
import SkillCard from "./SkillCard.jsx";
import { motion } from "framer-motion";

const Intro = () => {
  const { user } = useUser();
  return (
    <div>
      <div
        className="h-[20rem] sm:h-[30rem] md:h-[38rem] bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.intro})` }}
      >
        <motion.div
          className="p-4 mt-6 sm:px-8 md:px-20 py-35 rounded pt-45 text-center max-w-4xl flex-col items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-2xl sm:text-3xl md:text-6xl font-bold text-black mb-6 "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Welcome {!user ? "to CareerFlow" : user.firstName}
          </motion.h1>

          <motion.h2
            className="text-sm sm:text-lg md:text-4xl font-semibold text-black mb-4 "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Your next job is just a click away
          </motion.h2>

          <motion.h2
            className="text-sm sm:text-lg md:text-3xl text-black mb-1 animate-pulse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Find your dream job with just a click —
          </motion.h2>

          <motion.h2
            className="text-sm sm:text-lg md:text-2xl text-black animate-pulse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            explore opportunities tailored to your skills and aspirations.
          </motion.h2>
        </motion.div>
      </div>
    </div>
  );
};

export default Intro;
