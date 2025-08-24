import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormPage from "./FormPage";

export default function DynamicDecodePage({ levelData, modal, programId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log("modal", modal);
    
    if (modal) {
      setIsModalOpen(true);
    }
  }, [modal]);

  // Parse HTML content from API and extract list items
  const parseContent = (content) => {
    if (!content) return [];

    // Remove HTML tags and clean content
    const cleanContent = content
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .replace(/&amp;/g, "&") // Fix HTML entities
      .replace(/\r/g, "\n") // Fix line breaks
      .trim();

    // Split by newlines and filter empty lines
    return cleanContent
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => line.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Left Section - 3/4 width on large screens */}
          <div className="lg:col-span-3 min-h-screen px-2 sm:px-4 overflow-y-auto scroll-hide">
            <div className="w-full mx-auto">
              <div className="flex-1">
                {/* Dynamic Sections based on API learningSections */}
                {levelData.learningSections?.map((section, sectionIndex) => (
                  <div
                    key={section._id || sectionIndex}
                    className={`bg-white ${
                      sectionIndex === 0 ? "rounded-t-xl" : ""
                    } ${
                      sectionIndex === levelData.learningSections.length - 1
                        ? "rounded-b-xl"
                        : ""
                    } p-4 sm:p-6 shadow-sm ${sectionIndex > 0 ? "mt-4" : ""}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm sm:text-base">
                          {sectionIndex + 1}
                        </span>
                      </div>
                      <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">
                        {section.title}
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

                      {/* Right Section with Content */}
                      <div className="ml-0 lg:ml-6 w-full">
                        <div className="mb-6 sm:mb-8 p-3 sm:p-4">
                          <div className="space-y-3">
                            {parseContent(section.content).map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2 flex-shrink-0"></div>
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
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - 1/4 width on large screens */}
          <div className="lg:col-span-1 w-full">
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
                  {levelData.level === 5
                    ? "Register for Decode The Child A masterclass to the DECODE Series "
                    : ` Enroll Now In`}
                </div>

                {/* Show first upcoming event info if available */}
                {levelData.upcomingEvents &&
                levelData.upcomingEvents.length > 0 ? (
                  <div className="mb-4 p-3 bg-white/10 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">
                      Next Session:
                    </h4>
                    <p className="text-sm mb-1 font-medium">
                      {levelData.title || `Level ${levelData.level}`}
                    </p>
                    <p className="text-sm opacity-90">
                      {levelData.upcomingEvents[0]?.price ||
                        levelData.price ||
                        ""}
                    </p>
                    {levelData.upcomingEvents[0]?.location && (
                      <p className="text-sm opacity-90">
                        📍 {levelData.upcomingEvents[0].location}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mb-4 p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                    <h4 className="font-semibold text-sm mb-2 text-yellow-200">
                      ⏰ Coming Soon
                    </h4>
                    <p className="text-sm opacity-90 text-yellow-100">
                      New sessions will be announced soon. Stay tuned for
                      updates!
                    </p>
                  </div>
                )}

                {/* <div className="font-bold mb-2 text-[20px] sm:text-[22.225px]">
                   {levelData.upcomingEvents && levelData.upcomingEvents.length > 0 
                     ? (levelData.upcomingEvents[0].price || levelData.price || "Price TBD")
                     : levelData.price || "Price TBD"
                   }
                 </div> */}

                {/* Show next session info if available */}
                {levelData.upcomingEvents &&
                  levelData.upcomingEvents.length > 0 &&
                  levelData.next_session && (
                    <div className="text-sm opacity-90 mt-4 sm:mt-6">
                      Next session starts: {levelData.next_session}
                    </div>
                  )}
              </div>

              {/* Dynamic Enrollment Features */}
              {levelData.upcomingEvents &&
              levelData.upcomingEvents.length > 0 ? (
                <ul className="list-disc text-[14px] sm:text-[15px] space-y-2 pl-5 marker:text-white marker:text-[10px] mb-4">
                  {levelData.enrollment_features?.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              ) : (
                <div className="text-[14px] sm:text-[15px] space-y-2 mb-4">
                  <p className="opacity-80 text-center">
                    No enrollment features available
                  </p>
                </div>
              )}

              <button
                onClick={() => setIsModalOpen(true)}
                className={`font-semibold transition-colors text-center mt-auto w-full py-3 sm:py-4 px-6 ${
                  levelData.upcomingEvents &&
                  levelData.upcomingEvents.length > 0
                    ? "text-white hover:opacity-90 cursor-pointer bg-[#C183B2]"
                    : "text-gray-300 cursor-not-allowed bg-gray-500"
                }`}
                style={{
                  borderRadius: "30px",
                }}
                disabled={
                  !(
                    levelData.upcomingEvents &&
                    levelData.upcomingEvents.length > 0
                  )
                }
              >
                {levelData.upcomingEvents && levelData.upcomingEvents.length > 0
                  ? levelData.level === 5 || levelData.level === 1
                    ? "Register Now"
                    : "Enroll Now"
                  : "Registration Coming Soon"}
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

                <Link
                  to="mailto:contact@ekaausa.com"
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
                src="/EK-2.jpg"
                alt="Lead Instructor"
                className="w-full h-48 object-cover"
              />
              <p className="font-semibold text-[#6E2D79] text-base sm:text-base py-3">
                Yuvraj Kapadia
              </p>
              <p className="text-[#6E2D79] text-sm sm:text-base px-4 pb-4 leading-relaxed">
                World-renowned master healer Yuvraj Kapadia is a leading expert
                in the science of the subconscious mind. As the founder of EKAA
                Global Institute, he trains practitioners in{" "}
                <span className="font-medium">
                  Integrated Clinical Hypnotherapy
                </span>{" "}
                across all continents.
                <br />
                <br />
                Specializing in:
                <ul className="list-disc list-inside text-left mt-2 mb-3 pl-4 space-y-1">
                  <li>Regression Therapy</li>
                  <li>Inner Child Work</li>
                  <li>Past Life Regression</li>
                  <li>Transpersonal Regression</li>
                  <li>Family & Systemic Constellations</li>
                </ul>
                Yuvraj conducts{" "}
                <span className="italic">sold-out retreats</span>, workshops,
                and trainings worldwide. This workshop offers a rare opportunity
                to experience his transformative energy as he guides
                participants through an experiential journey of conscious
                parenting - healing subconscious wounds and unlocking profound
                personal growth.
                <br />
                <br />
                <span className="font-semibold text-[#6E2D79]">
                  A once-in-a-lifetime experience
                </span>{" "}
                with one of the world's most sought-after healers.
              </p>
            </div>

            {levelData.level === 5 && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden text-center mt-6 ">
                <img
                  src="/Mirani Smith.jpeg"
                  alt="Lead Instructor"
                  className="w-full h-48 object-cover"
                />
                <p className="font-semibold text-[#6E2D79] text-base sm:text-base py-3">
                  Mirani Smith
                </p>
                <p className="text-[#6E2D79] text-sm sm:text-base px-4 pb-4 leading-relaxed">
                  With over 40 years as a Montessori guide, trainer, and
                  administrator, Mirani has dedicated her career to
                  personalizing education for neurodiverse children. Her
                  extensive experience includes serving as:
                  <ul className="list-disc list-inside text-left mt-2 mb-3 pl-4 space-y-1">
                    <li>
                      Executive Director and AMI Primary Trainer at Houston
                      Montessori Institute (10 years)
                    </li>
                    <li>
                      Early Childhood Director at The Post Oak School (10 years)
                    </li>
                  </ul>
                  Mirani holds an AMI Diploma from Sri Lanka, an M.Ed. from
                  Loyola University Maryland, and earned her AMI Primary Trainer
                  certification in 2012. Her practice is rooted in careful
                  observation and adaptation to each child's unique learning
                  needs.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Registration Form Modal */}
      {isModalOpen && (
        // <FormPage onClose={handleCloseModal} level={levelData.level} />
        <FormPage
          onClose={handleCloseModal}
          level={levelData.level}
          upcomingEventId={
            levelData.upcomingEvents && levelData.upcomingEvents.length > 0
              ? levelData.upcomingEvents[0]._id
              : ""
          }
          programId={programId}
          upcomingEvents={levelData.upcomingEvents}
        />
      )}
    </div>
  );
}
