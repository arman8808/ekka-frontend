import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import HeroSection from "../components/utils/HeroSection";
import Card from "../components/utils/Card.jsx";
function ICH() {
  return (
    <div>
      {" "}
      <Header />
      <HeroSection
        content={
          <div className="text-center">
            <h1 className="max-w-[90%] md:max-w-[1331px] text-white font-[Poppins] text-[30px] sm:text-[35px] md:text-[60px] lg:text-[65px] font-semibold leading-[44px] sm:leading-[60px] md:leading-[72px] mb-2 sm:mb-4 -mt-8 sm:-mt-12">
              Integrated Clinical Hypnotherapy
            </h1>
          </div>
        }
        contentPosition="above"
      />
      <Card />
      <FAQ />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default ICH;
