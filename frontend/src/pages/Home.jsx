import React from 'react'
import HomeCenter from '../components/HomeCenter'
import { useUser } from '@clerk/clerk-react'
import HeroSection from '../components/HeroSection'
import JobListing from '../components/JobListing'


const Home = () => {
  const { user } = useUser();
  return (
    !user ? <HomeCenter/> : 
    (
      <>
        <HeroSection/>
        <JobListing/>
      </>
    )
    
  )
}

export default Home
