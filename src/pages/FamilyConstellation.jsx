import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import ProfileCard from "../components/utils/ProfileCard";
import UpcomingSessions from "../components/utils/UpcomingSessions";
import HeroSection from "../components/utils/HeroSection";
function FamilyConstellation() {
  return (
    <div>
      {" "}
      <Header />
      <HeroSection
        content={
          <div className="text-center">
            <h1 className="max-w-[90%] md:max-w-[1331px] text-white font-[Poppins] text-[30px] sm:text-[35px] md:text-[60px] lg:text-[65px] font-semibold leading-[44px] sm:leading-[60px] md:leading-[72px] mb-2 sm:mb-4 -mt-8 sm:-mt-12">
              Family Constellation
            </h1>
          </div>
        }
        contentPosition="above"
      />
      <div
        className="py-16 px-4 md:px-8"
        style={{
          background: `linear-gradient(to right, rgba(193, 131, 178, 0.1),rgb(212,195,213,0.8) )`,
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#6E2D79] mb-5">
            About Family Constellation
          </h2>
          <p className="text-lg text-[#6E2D79] leading-relaxed">
            A therapeutic method to reveal and heal hidden dynamics in family
            systems that influence our behaviors, relationships, and emotional
            well-being.
          </p>
        </div>
      </div>
      <ProfileCard />
      <UpcomingSessions />
      <FAQ />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default FamilyConstellation;
