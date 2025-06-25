import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Clock, GraduationCap } from "lucide-react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Faq2 from "../components/decode/Faq2";
import TestimonialCarousel from "../components/home/Testimonials";
import { levelsData } from "../components/data/ich.levels.data";
import FormPage from "../components/level1/FormPage";
const ICHLevels = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const level = searchParams.get("level") || "1";

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Data for different levels

  const scheduleData = [
    { city: "Dallas", venue: "Abc", date: "Jun 15, 2025", time: "10:00 AM" },
    { city: "Texas", venue: "Xyz", date: "Jun 20, 2025", time: "2:00 PM" },
    { city: "Houston", venue: "Rty", date: "Jul 1, 2025", time: "9:00 AM" },
    { city: "Austin", venue: "Abcz", date: "Jun 25, 2025", time: "11:00 AM" },
  ];

  const levelData = levelsData[level] || levelsData[1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Header />
      <div
        className="w-full bg-cover bg-center flex flex-col items-center justify-center text-center text-white py-16 px-4"
        style={{
          backgroundImage: "url('/decode/Hero Image.svg')",
          height: "541px",
          flexShrink: 0,
        }}
      >
        <h1 className="text-[#6E2D79] font-[Poppins] text-[30px] sm:text-[35px] md:text-[60px] lg:text-[65px] font-semibold leading-[44px] sm:leading-[60px] md:leading-[72px] mb-2 sm:mb-4 -mt-8 sm:-mt-12">
          {levelData.title}
        </h1>
        <p className="text-[#5C2166] font-[Poppins] text-[16px] sm:text-[18px] lg:text-[18px] font-normal leading-[24px] px-4 mb-6">
          {levelData.subtitle}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex justify-center items-center gap-2 px-2.5 py-2 rounded-full border border-[#6E2D79] bg-[#6E2D79] text-white text-sm">
            <Clock size={16} /> Duration: {levelData.duration}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#6E2D79] text-white rounded-full text-sm">
            {levelData.certification} <GraduationCap size={16} />
          </div>
        </div>
      </div>

      <div className="mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Left Section - 3/4 width on large screens */}
          <div className="lg:col-span-3 min-h-screen px-2 sm:px-4 overflow-y-auto scroll-hide">
            <div className="w-full mx-auto">
              <div className="flex-1">
                {/* What You'll Learn - Only show if data exists */}
                {levelData.what_youll_learn &&
                  levelData.what_youll_learn.length > 0 && (
                    <div className="bg-white rounded-t-xl p-4 sm:p-6 shadow-sm mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm sm:text-base">
                            1
                          </span>
                        </div>
                        <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">
                          What You'll Learn
                        </h2>
                      </div>
                      <div className="bg-[#C183B2] h-[2px] mb-4"></div>
                      <div className="flex flex-col lg:flex-row">
                        <div className="hidden lg:flex w-auto items-center justify-center mb-4 lg:mb-0">
                          <div className="w-[40px] h-[200px] sm:w-[59px] sm:h-[343px] flex items-center">
                            <img
                              src="/2.2.svg"
                              alt="Leaf"
                              className="w-auto h-full object-contain"
                            />
                          </div>
                        </div>
                        <div className="ml-0 lg:ml-6 w-full">
                          <div className="mb-6 sm:mb-8 p-3 sm:p-4">
                            <div className="space-y-3">
                              {levelData.what_youll_learn.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-3"
                                >
                                  <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-[#6E2D79] text-sm sm:text-base">
                                    <p>{item.heading}</p> {item.description}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Course Benefits - Only show if data exists */}
                {(levelData.immediate_benefits ||
                  levelData.long_term_benefits) && (
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm sm:text-base">
                          2
                        </span>
                      </div>
                      <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">
                        Course Benefits
                      </h2>
                    </div>
                    <div className="bg-[#C183B2] h-[2px] mb-4"></div>
                    <div className="flex flex-col lg:flex-row">
                      <div className="hidden lg:flex w-auto items-center justify-center mb-4 lg:mb-0">
                        <div className="w-[40px] h-[200px] sm:w-[59px] sm:h-[343px] flex items-center">
                          <img
                            src="/2.2.svg"
                            alt="Leaf"
                            className="w-auto h-full object-contain"
                          />
                        </div>
                      </div>
                      <div className="ml-0 lg:ml-6 w-full">
                        {/* Immediate Benefits */}
                        {levelData.immediate_benefits &&
                          levelData.immediate_benefits.length > 0 && (
                            <div className="mb-6 sm:mb-8 s rounded-lg p-3 sm:p-4">
                              <h3 className="font-semibold text-[#6E2D79] text-[18px] sm:text-[21px] mb-4">
                                Immediate Practical Applications
                              </h3>
                              <div className="space-y-3">
                                {levelData.immediate_benefits.map(
                                  (item, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-start gap-3"
                                    >
                                      <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2"></div>
                                      <span className="text-[#6E2D79] text-sm sm:text-base">
                                        {item}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {/* Long-term Benefits */}
                        {levelData.long_term_benefits &&
                          levelData.long_term_benefits.length > 0 && (
                            <div className="mb-6 sm:mb-8 p-3 sm:p-4">
                              <h3 className="font-semibold text-[#6E2D79] text-[18px] sm:text-[21px] mb-4">
                                Long-Term Transformational Outcomes
                              </h3>
                              <div className="space-y-3">
                                {levelData.long_term_benefits.map(
                                  (item, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-start gap-3"
                                    >
                                      <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2"></div>
                                      <span className="text-[#6E2D79] text-sm sm:text-base">
                                        {item}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Curriculum - Only show if data exists */}
                {levelData.curriculum && levelData.curriculum.length > 0 && (
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm sm:text-base">
                          3
                        </span>
                      </div>
                      <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">
                        Curriculum Overview
                      </h2>
                    </div>
                    <div className="bg-[#C183B2] h-[2px] mb-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {levelData.curriculum.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3  rounded-lg"
                        >
                          <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-[#6E2D79] text-sm sm:text-base">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Who Should Attend - Only show if data exists */}
                {levelData.who_should_attend &&
                  levelData.who_should_attend.length > 0 && (
                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm sm:text-base">
                            4
                          </span>
                        </div>
                        <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">
                          Who Should Attend
                        </h2>
                      </div>
                      <div className="bg-[#C183B2] h-[2px] mb-4"></div>
                      <div className="space-y-3">
                        {levelData.who_should_attend.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2"></div>
                            <span className="text-[#6E2D79] text-sm sm:text-base">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Prerequisites - Only show if data exists */}
                {levelData.prerequisites &&
                  levelData.prerequisites.length > 0 && (
                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm sm:text-base">
                            5
                          </span>
                        </div>
                        <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">
                          Prerequisites
                        </h2>
                      </div>
                      <div className="bg-[#C183B2] h-[2px] mb-4"></div>
                      <div className="space-y-3">
                        {levelData.prerequisites.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2"></div>
                            <span className="text-[#6E2D79] text-sm sm:text-base">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Right Section - 1/4 width on large screens */}
          <div className="lg:col-span-1 w-full">
            {/* Enrollment Card */}
            <div
              className="rounded-[10px] p-4 sm:p-6 text-white flex flex-col mb-6"
              style={{
                minHeight: "400px",
                height: "auto",
                backgroundColor: "#6E2D79",
              }}
            >
              <div className="mb-6">
                <div className="flex flex-col justify-center mb-2 text-[18px] sm:text-[22.225px] opacity-90">
                  Enroll in Level {levelData.level}
                </div>

                <div className="font-bold mb-2 text-[20px] sm:text-[22.225px]">
                  {levelData.price}
                </div>
                {levelData.next_session && (
                  <div className="text-sm opacity-90 mt-4 sm:mt-6">
                    Next session starts: {levelData.next_session}
                  </div>
                )}
              </div>

              {levelData.enrollment_features &&
                levelData.enrollment_features.length > 0 && (
                  <ul className="list-disc text-[14px] sm:text-[15px] space-y-2 pl-5 marker:text-white marker:text-[10px] mb-4">
                    {levelData.enrollment_features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                )}

              <button
                onClick={() => setIsModalOpen(true)}
                className="text-white font-semibold transition-colors text-center mt-auto hover:opacity-90 cursor-pointer w-full py-3 sm:py-4 px-6"
                style={{
                  borderRadius: "30px",
                  background: "#C183B2",
                }}
              >
                Enroll Now
              </button>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl p-4 sm:p-6 mb-6 shadow-sm">
              <div
                className="flex flex-col items-start h-full"
                style={{ borderColor: "#6E2D79" }}
              >
                <h3 className="mb-2 font-bold text-[18px] sm:text-[21px] text-[#4A2C82]">
                  Have Questions?
                </h3>
                <Link
                  to="mailto:someone@example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm transition-colors inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2 sm:py-3 rounded-[30px] bg-[#6E2D79] cursor-pointer"
                >
                  Email Us
                </Link>
              </div>
            </div>

            {/* Instructor Card - Only show if instructor data exists */}
            {levelData.instructor && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden text-center">
                <img
                  src="/EK-2.jpg"
                  alt="Lead Instructor"
                  className="w-full h-auto object-cover"
                />
                <div className="p-4">
                  <p className="font-semibold text-[#6E2D79] text-base sm:text-base">
                    {levelData.instructor.name}
                  </p>
                  {levelData.instructor.qualification && (
                    <p className="text-sm text-gray-600 mt-1">
                      {levelData.instructor.qualification}
                    </p>
                  )}
                  {levelData.instructor.experience && (
                    <p className="text-sm text-gray-600 mt-1">
                      {levelData.instructor.experience}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Schedule Section - Only show if session_details exists */}
      {levelData.session_details && (
        <section className="px-4 sm:px-6 py-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm sm:text-base">
                    6
                  </span>
                </div>
                <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">
                  Upcoming Workshop
                </h2>
              </div>
              <hr className="mt-2 border-t border-purple-300" />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#6E2D79] mb-2">
                    Date & Time
                  </h3>
                  <p className="text-gray-700">
                    {levelData.session_details.date}
                    <br />
                    {levelData.session_details.time}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#6E2D79] mb-2">
                    Venue
                  </h3>
                  <p className="text-gray-700">
                    {levelData.session_details.venue}
                  </p>
                </div>
                {levelData.session_details.registration && (
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-[#6E2D79] mb-2">
                      Registration
                    </h3>
                    <p className="text-gray-700">
                      {levelData.session_details.registration}
                    </p>
                  </div>
                )}
                {levelData.session_details.discount_note && (
                  <div className="md:col-span-2 bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-700">
                      {levelData.session_details.discount_note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              {/* <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm sm:text-base">
                  3
                </span>
              </div> */}
              <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">
                Upcoming Workshop
              </h2>
            </div>
            <hr className="mt-2 border-t border-purple-300" />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-purple-300 rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-[#6E2D79] text-white text-left text-sm sm:text-base">
                  <th className="px-4 py-3 font-medium">City</th>
                  <th className="px-4 py-3 font-medium">Venue</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((item, idx) => (
                  <tr
                    key={idx}
                    className=" border-t border-[#A35F93] text-sm sm:text-base"
                  >
                    <td className="px-4 py-3">{item.city}</td>
                    <td className="px-4 py-3">{item.venue}</td>
                    <td className="px-4 py-3">{item.date}</td>
                    <td className="px-4 py-3">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Registration Form Modal */}
      {isModalOpen && <FormPage onClose={handleCloseModal} />}
      <TestimonialCarousel />
      <Faq2 />
      <Footer />
    </div>
  );
};

export default ICHLevels;
