// import React from 'react'
// import Header from '../components/Header'
// import Footer from '../components/Footer'
// // import LevelBanner from '../components/level1/Levelbanner'
// import LevelBanner from '../components/level1/LevelBanner'
// import TestimonialCarousel from '../components/home/Testimonials'
// import FAQ from '../components/home/FAQ'
// import DecodePage from '../components/level1/DecodePage'
 
// function Level1() {
//   return (
//     <>
//     <Header/>
//     <LevelBanner/>
//     <DecodePage/>
//     <TestimonialCarousel/>
//     <FAQ/>
//     <Footer/>
//     </>
//   )
// }

// export default Level1








import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DynamicLevelBanner from '../components/level1/LevelBanner';
import TestimonialCarousel from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import DynamicDecodePage from '../components/level1/DecodePage';
// import { courseData } from '../data/courseData';
import { courseData } from '../../courseData';
import Faq2 from '../components/decode/Faq2';

function DynamicLevelPage() {
  const { levelNumber } = useParams();
  
  // Find the level data based on the URL parameter
  const levelData = courseData.course_program.levels.find(
    level => level.level === parseInt(levelNumber)
  );

  // If level not found, show error or redirect
  if (!levelData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Level Not Found</h1>
          <p className="text-gray-600">The requested level does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header/>
      <DynamicLevelBanner levelData={levelData} />
      <DynamicDecodePage levelData={levelData} />
      <TestimonialCarousel/>
      <Faq2/>
      <Footer/>
    </>
  );
}

export default DynamicLevelPage;