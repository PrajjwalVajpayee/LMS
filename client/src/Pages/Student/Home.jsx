import React from 'react'
import Hero from '../../Components/Student/Hero'
import Companies from '../../Components/Student/Companies'
import CoursesSection from '../../Components/Student/CoursesSection'
import Testimonials from '../../Components/Student/Testimonials'
import CalltoAction from '../../Components/Student/CalltoAction'
import Footer from '../../Components/Student/Footer'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero />
      <Companies />
      <CoursesSection />
      <Testimonials/>
      <CalltoAction/>
      <Footer/>
    </div>
  )
}

export default Home
