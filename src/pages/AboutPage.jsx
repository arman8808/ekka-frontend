import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Founder from "../components/about/Founder";
import Mission from "../components/about/Mission";
import Milestones from "../components/about/Milestones";
import PersonalGuidanceBanner from "../components/home/PersonalGuidanceBanner";
import LeadershipSection from "../components/about/LeadershipSection";
import OurAfflication from "../components/about/OurAfflication";
import Usateamsection from "../components/about/usateamsection";

function AboutPage() {
  return (
    <>
      <Header />
      <Mission />
      {/* New centered image between Mission and Founder */}
      <div className="relative">
        <div className="hidden lg:block absolute -top-26 left-1/2 -translate-x-1/2 z-[999] pointer-events-none">
          <img src="/2.2.svg" alt="Leaf" className="mx-auto" />
        </div>
      </div>
      <div className="relative bg-gradient-to-br from-purple-200/20 to-pink-200/20 p-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <h1 className="text-center text-[18px]  sm:text-[20px] md:text-[24px] font-semibold pb-2 text-[#6E2D79] font-[Poppins] mb-2">
            Meet Our Directors
          </h1>
          <Founder />
          {/* <div className="hidden lg:block absolute top-19 left-1/2 -translate-x-1/2 sm:top-20 sm:left-1/2 md:top-127 md:left-100 lg:top-135 lg:left-1/2 z-[999] pointer-events-none">
            <img src="/2.2.svg" alt="Leaf" />
          </div> */}
          <LeadershipSection />
        </div>
      </div>{" "}
      <div className="relative bg-gradient-to-br from-purple-200/20 to-pink-200/20 p-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <h1 className="text-center text-[18px]  sm:text-[20px] md:text-[24px] font-semibold pb-2 text-[#6E2D79] font-[Poppins] mb-2">
            Meet Our USA Team
          </h1>

          <Usateamsection />
        </div>
      </div>
      <OurAfflication />
      {/* <div className="relative">
        <Milestones />
        <div className="hidden lg:block absolute top-[1000px] left-1/2 transform -translate-x-1/2 z-[999] pointer-events-none">
          <img src="/2.2.svg" alt="Leaf" className="mx-auto" />
        </div>
        <PersonalGuidanceBanner />
      </div> */}
      <Footer />
    </>
  );
}

export default AboutPage;
