import React from 'react'
import HomeCenter from '../components/HomeCenter'
import { useUser } from '@clerk/clerk-react'
import HeroSection from '../components/HeroSection'
import JobListing from '../components/JobListing'
import Navbar from '../components/Navbar'


const Home = () => {
  const { user } = useUser();
  return (
    !user ? <HomeCenter/> : 
    (
      <>
        <Navbar/>
        <HeroSection/>
        <JobListing/>
      </>
    )
    
  )
}

export default Home
