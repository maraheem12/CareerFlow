import React from 'react'
import TechStack from '../components/TechStack'
import AboutIntro from '../components/AboutIntro'
import AboutPlatform from '../components/AboutPlatform'
import AboutSearch from '../components/AboutSearch'
import Navbar from '../components/Navbar'



const About = () => {
  return (
    <div>
      <Navbar />
      <AboutIntro/>
      <AboutPlatform/>
      <TechStack/>
      <AboutSearch/>
    </div>
  )
}

export default About
