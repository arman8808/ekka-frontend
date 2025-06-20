import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Herosection from '../components/decode/Herosection'
import Card from '../components/decode/Card'
import Testimonials from '../components/home/Testimonials'
import FAQ from '../components/home/FAQ'
import DecodeComponent from '../components/home/DecodeComponent'
import VideoPlayer from '../components/home/VideoPlayer'
import VideoPlayer2 from '../components/decode/VideoPlayer2'
import Faq2 from '../components/decode/Faq2'

function DecodePage() {
  return (
    <>
      <Header />
      <Herosection />

      <Card />
      
      <div className="relative">
        <Testimonials />
        
        <div className="hidden lg:block absolute top-19 left-1/2 -translate-x-1/2 sm:top-20 sm:left-1/2 md:top-72 md:left-100 lg:top-190 lg:left-1/2 z-[999] pointer-events-none">
          <img src="/2.2.svg" alt="Leaf" />
        </div>
        
        <FAQ/>
      </div>
      <Footer />
    </>
  )
}

export default DecodePage