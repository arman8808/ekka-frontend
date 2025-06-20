import React from 'react'
import HeroSection from '../components/home/HeroSection'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FAQ from '../components/home/FAQ'
import BenefitSection from '../components/home/BenefitSection'
import TrainingPrograms from '../components/home/TrainingPrograms'
import HowEkaaHelps from '../components/home/HowEkaaHelps'
import VideoPlayer from '../components/home/VideoPlayer'
import DecodeComponent from '../components/home/DecodeComponent'
import PersonalGuidanceBanner from '../components/home/PersonalGuidanceBanner'
import Testimonials from '../components/home/Testimonials'

function HomePage() {
  return (
    <>
      <div className="relative w-full min-h-[800px] h-[800px] flex flex-col " style={{ backgroundImage: "url('/Hero Image.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Header />
        <HeroSection />
      </div>
      <div className="relative">
        <VideoPlayer />
        {/* <div className="hidden lg:block absolute top-19 left-1/2 -translate-x-1/2 sm:top-20 sm:left-1/2 md:top-70 md:left-100 lg:top-130 lg:left-1/2 z-[999] pointer-events-none">
          <img src="/2.2.svg" alt="Leaf" />
        </div> */}
        {/* <HowEkaaHelps /> */}
        <div className="relative">
        <PersonalGuidanceBanner />
        <div className="hidden lg:flex relative z-10 mt-[-60px] mb-[-30px] justify-center pointer-events-none">
          <img src="/2.2.svg" alt="Leaf" />
        </div>
      </div>
      </div>


      <div className="relative">
        <DecodeComponent />
        <div className="hidden lg:block absolute top-[14rem] sm:top-[18rem] left-1/2 -translate-x-1/2 md:top-[27.5rem] lg:top-[27.5rem] z-[999] pointer-events-none">
          <img src="/2.2.svg" alt="Leaf" />
        </div>
        <HowEkaaHelps />
      </div>

      
      <TrainingPrograms/>


      <Testimonials />

      <Footer />
    </>
  )
}

export default HomePage





//

// hero section
// video
// personal guidencce
// decode section
// who can benifit
// TrainingPrograms
// test
// fott