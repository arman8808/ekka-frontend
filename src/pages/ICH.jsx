import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import HeroSection from "../components/utils/HeroSection";
import Card from "../components/decode/Card";
function ICH() {
  return (
    <div>
      {" "}
      <Header />
      <HeroSection
        content={
          <div className="text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
              <button className="bg-[#6E2D79] text-white rounded-full px-8 py-4 font-medium transition-colors hover:bg-[#5c2166] w-full sm:w-auto sm:min-w-[275px] text-center">
                Step into clarity
              </button>
              <button className="bg-[#6E2D79] text-white rounded-full px-8 py-4 font-medium transition-colors hover:bg-[#5c2166] w-full sm:w-auto sm:min-w-[275px] text-center">
                Decode your inner patterns
              </button>
            </div>
          </div>
        }
        contentPosition='below'
        
      />
      <Card />
      <FAQ />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default ICH;
