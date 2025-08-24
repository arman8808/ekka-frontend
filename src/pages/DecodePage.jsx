import React, { useState, useEffect } from 'react'
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
import decodeService from '../components/services/decodeService'

function DecodePage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await decodeService.getUserPrograms();
      
      // Handle different response structures
      const programsData = response.programs || response.data || response || [];
      setPrograms(programsData);
    } catch (err) {
      console.error("Error fetching decode programs:", err);
      setError(err.message || "Failed to fetch programs");
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Herosection />

      <Card 
        programs={programs}
        loading={loading}
        error={error}
        onRetry={fetchPrograms}
      />
      
      <div className="relative">
        <Testimonials />
        
        <div className="hidden lg:block absolute top-19 left-1/2 -translate-x-1/2 sm:top-20 sm:left-1/2 md:top-72 md:left-100 lg:top-190 lg:left-1/2 z-[999] pointer-events-none">
          <img src="/2.2.svg" alt="Leaf" />
        </div>
        
        {/* <FAQ/> */}
      </div>
      <Footer />
    </>
  )
}

export default DecodePage