import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormPage from "./FormPage";

export default function DynamicDecodePage({ levelData, modal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (modal) {
      setIsModalOpen(true);
    }
  }, [modal]);
  const scheduleData = [
    {
      city: "Houston",
      date: "Aug 10th, 2025",
      Facilitator: "Yuvraj Kapadia",
      title: "Master Class For teachers",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="mx-auto p-4 sm:p-6">
        {/* <div className="mb-6 sm:mb-8 flex justify-center sm:justify-start">
          <img
            src="/decodelogo.png"
            alt="Decode Logo"
            className="w-[200px] sm:w-[264.375px] h-auto object-contain"
          />
        </div> */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Left Section - 3/4 width on large screens */}
          <div className="lg:col-span-3 min-h-screen px-2 sm:px-4 overflow-y-auto scroll-hide">
            <div className="w-full mx-auto">
              <div className="flex-1">
                {/* What You'll Learn */}
                <div className="bg-white rounded-t-xl p-4 sm:p-6 shadow-sm">
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
                    {/* Left Section with Image */}
                    <div className="hidden lg:flex w-auto items-center justify-center mb-4 lg:mb-0">
                      <div className="w-[40px] h-[200px] sm:w-[59px] sm:h-[343px] flex items-center">
                        <img
                          src="/2.2.svg"
                          alt="Leaf"
                          className="w-auto h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Right Section with Content Boxes */}
                    <div className="ml-0 lg:ml-6 w-full">
                      {/* Description */}
                      {/* <div className="mb-6 sm:mb-8">
                        <p className='text-[14px] sm:text-[15px] text-[#6E2D79] leading-relaxed'>
                          {levelData.description}
                        </p>
                      </div> */}

                      {/* Learning Points */}
                      <div className="mb-6 sm:mb-8 p-3 sm:p-4">
                        <h3 className="font-semibold text-[#6E2D79] text-[18px] sm:text-[21px] mb-4"></h3>
                        <div className="space-y-3">
                          {levelData.what_youll_learn.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-[#6E2D79] text-sm sm:text-base">
                                <strong>{item.heading}</strong>{" "}
                                {item.description}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Benefits */}
                <div className="bg-white rounded-b-xl p-4 sm:p-6 shadow-sm">
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
                    {/* Left Section with Image */}
                    <div className="hidden lg:flex w-auto items-center justify-center mb-4 lg:mb-0">
                      <div className="w-[40px] h-[200px] sm:w-[59px] sm:h-[343px] flex items-center">
                        <img
                          src="/2.2.svg"
                          alt="Leaf"
                          className="w-auto h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Right Section with Content Boxes */}
                    <div className="ml-0 lg:ml-6 w-full">
                      {/* Immediate Benefits */}
                      <div className="mb-6 sm:mb-8  rounded-lg p-3 sm:p-4">
                        <h3 className="font-semibold text-[#6E2D79] text-[18px] sm:text-[21px] mb-4">
                          Immediate Practical Applications
                        </h3>
                        <div className="space-y-3">
                          {levelData.immediate_benefits.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2"></div>
                              <span className="text-[#6E2D79] text-sm sm:text-base">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Long-term Benefits */}
                      <div className="mb-6 sm:mb-8 p-3 sm:p-4">
                        {levelData.long_term_benefits && (
                          <h3 className="font-semibold text-[#6E2D79] text-[18px] sm:text-[21px] mb-4">
                            Long-Term Transformational Outcomes
                          </h3>
                        )}

                        <div className="space-y-3">
                          {levelData.long_term_benefits?.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2"></div>
                              <span className="text-[#6E2D79] text-sm sm:text-base">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - 1/4 width on large screens */}
          <div className="lg:col-span-1 w-full">
            <div
              className="rounded-[10px] p-4 sm:p-6 text-white flex flex-col"
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
                <div className="text-sm opacity-90 mt-4 sm:mt-6">
                  Next session starts: {levelData.next_session}
                </div>
              </div>

              <ul className="list-disc text-[14px] sm:text-[15px] space-y-2 pl-5 marker:text-white marker:text-[10px] mb-4">
                {levelData.enrollment_features?.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              {/* Button pushed to bottom using mt-auto */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-white font-semibold transition-colors text-center mt-auto hover:opacity-90 cursor-pointer w-full py-3 sm:py-4 px-6"
                style={{
                  borderRadius: "30px",
                  background: "#C183B2",
                }}
                disabled={levelData.level !== 5 ? true : false}
              >
                Enroll Now
              </button>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 mt-6 shadow-sm">
              <div
                className="flex flex-col items-start h-full"
                style={{ borderColor: "#6E2D79" }}
              >
                <h3 className="mb-2 font-bold text-[18px] sm:text-[21px] text-[#4A2C82]">
                  Have Questions?
                </h3>

                {/* <p className="mb-3 text-[14px] sm:text-[15.125px] text-[#333] font-normal">
                  Got a query to help you understand if this course is right for you?
                </p> */}

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

            {/* Instructor Card */}

            <div className="bg-white rounded-xl shadow-md overflow-hidden text-center mt-6">
              <img
                src="/EK-2.jpg" // ← Full-width image
                alt="Lead Instructor"
                className="w-full h-auto object-cover"
              />
              <p className="font-semibold text-[#6E2D79] text-base sm:text-base py-3">
                Lead Instructor
              </p>
            </div>
            {/* <div className="bg-white rounded-xl p-4 sm:p-6 mt-6 shadow-sm">
              <div className="flex items-start gap-4">
                
                <div className="flex-shrink-0">
                  <img
                    src="/EK-2.jpg"
                    alt="Lead Instructor"
                    className="w-16 h-16 sm:w-16 sm:h-16 rounded-full object-cover"
                  />
                </div>

                
                <div>

                  <h4 className="font-semibold text-[#6E2D79] text-sm sm:text-base">Lead Instructor</h4>
                  <p className="text-[#6E2D79] mb-3 text-sm">5 years of experience in hypnotherapy and mindfulness practices</p>

                </div>
              </div>

              <p className="text-[#6E2D79] text-xs sm:text-sm">
                Dr. Yuvraj Kapadia, founder of EKAA, pioneers subconscious healing.He empowers individuals through emotional mastery and mindful living.
              </p>


            </div> */}

            {/* Brand Logo */}
            {/* <div className="flex mt-8 sm:mt-16 justify-center space-x-2">
              <img
                src="/logo.svg"
                alt="Ekaa Logo"
                className="w-[150px] h-[170px] sm:w-[211px] sm:h-[234px] object-contain"
              />
            </div> */}
          </div>
        </div>
      </div>

      {levelData.level === 5 && (
        <section className="">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm sm:text-base">
                    3
                  </span>
                </div>
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
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium">City</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Facilitator</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((item, idx) => (
                    <tr
                      key={idx}
                      className=" border-t border-[#A35F93] text-sm sm:text-base"
                    >
                      <td className="px-4 py-3">{item.title}</td>
                      <td className="px-4 py-3">{item.city}</td>
                      <td className="px-4 py-3">{item.date}</td>
                      <td className="px-4 py-3">{item.Facilitator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Registration Form Modal */}
      {isModalOpen && <FormPage onClose={handleCloseModal} />}
    </div>
  );
}
