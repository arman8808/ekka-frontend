// // import React, { useState } from 'react';
// // import FormPage from './FormPage';

// // export default function DecodePage() {
// //   const [isModalOpen, setIsModalOpen] = useState(false);


// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
// //       <div className=" mx-auto p-6">
// //         <div className="mb-8 ">
// //           <img
// //             src="/decode/e7a8dec60984c41162b5728d42a49e313240e332.png"
// //             alt="Decode Logo"
// //             className=""
// //             style={{
// //               width: "264.375px",
// //               height: "94px",
// //               aspectRatio: "264.38 / 94.00",
// //               objectFit: "contain",
// //             }}
// //           />
// //         </div>
// //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

// //           {/* Left Section - 3/4 width on large screens */}
// //        <div className="lg:col-span-3 min-h-screen px-4 overflow-y-auto scroll-hide">


// //             <div className="w-full mx-auto">
// //               <div className="flex-1">

// //                 {/* What You'll Learn */}
// //                 <div className="bg-white rounded-t-xl p-6 shadow-sm">
// //                   <div className="flex items-center gap-2 mb-2">
// //                     <div className="w-[50px] h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
// //                       <span className="text-white font-semibold">1</span>
// //                     </div>
// //                     <h2 className="text-[24px] text-[#6E2D79] font-semibold">Instructor</h2>
// //                   </div>
// //                   <div className='bg-[#C183B2] h-[2px] mb-4'></div>
// //                   <div className="flex">
// //                     {/* Left Section with Image */}
// //                     <div className="w-auto flex items-center justify-center">
// //                       <div className="w-[59px] h-[343px] flex items-center">
// //                         <img src="/2.2.svg" alt="Leaf" className="w-auto h-full object-contain" />
// //                       </div>
// //                     </div>

// //                     {/* Right Section with Content Boxes */}
// //                     <div className="ml-6 w-full ">
// //                       {/* Box 1 */}
// //                       <div className="mb-8  ">
// //                         <p className='text-[15px] text-[#6E2D79]'>This foundational level course introduces you to the core concepts of mind transformation
// //                           through  clinical hypnotherapy techniques. You'll learn how to reprogram your subconscious
// //                           mind for positive change, better sleep, and systematic meditation.</p>
// //                       </div>

// //                       {/* Box 2 */}
// //                       <div className="mb-8 p-4">
// //                         <h3 className="font-semibold text-[#6E2D79] text-[21px] mb-4">What You'll Learn</h3>
// //                         <div className="space-y-3">
// //                           {[
// //                             {
// //                               heading: "The Flip in self-perception:",
// //                               description: " A logical model explaining how and why we must transform ourselves to change our reality"
// //                             },
// //                             {
// //                               heading: "Theory of Mind:",
// //                               description: " Understanding how your mind functions at conscious and subconscious levels"
// //                             },
// //                             {
// //                               heading: "Hypnotic/meditative states:",
// //                               description: " What they are and how to access them effectively."
// //                             },
// //                             {
// //                               heading: "Theory of suggestibility:",
// //                               description: " How we unconsciously program ourselves to process communication."
// //                             },
// //                             {
// //                               heading: "Personal language patterns:",
// //                               description: " Your unique style of professional & social interactivity"
// //                             },
// //                             {
// //                               heading: "Assessing suggestibility:",
// //                               description: " Determine your personal suggestibility type"
// //                             },
// //                             {
// //                               heading: "Crafting effective suggestions:",
// //                               description: " How to word suggestions for self-improvement & transformation"
// //                             },
// //                             {
// //                               heading: "Subconscious access:",
// //                               description: " Procedures to access your subconscious mind independently"
// //                             }
// //                           ].map((item, idx) => (
// //                             <div key={idx} className="flex items-start gap-3">
// //                               <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2 flex-shrink-0"></div>
// //                               <span className="text-[#6E2D79]">
// //                                 <strong>{item.heading}</strong> {item.description}
// //                               </span>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>

// //                     </div>
// //                   </div>

// //                 </div>

// //                 {/* Course Benefits */}
// //                 <div className="bg-white rounded-b-xl p-6 shadow-sm">
// //                   <div className="flex items-center gap-2 mb-2">
// //                     <div className="w-[50px] h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
// //                       <span className="text-white font-semibold">2</span>
// //                     </div>
// //                     <h2 className="text-[24px] text-[#6E2D79] font-semibold">Course Benefits</h2>
// //                   </div>
// //                   <div className='bg-[#C183B2] h-[2px] mb-4'></div>
// //                   <div className="flex">
// //                     {/* Left Section with Image */}
// //                     <div className="w-auto flex items-center justify-center">
// //                       <div className="w-[59px] h-[343px] flex items-center">
// //                         <img src="/2.2.svg" alt="Leaf" className="w-auto h-full object-contain" />
// //                       </div>
// //                     </div>

// //                     {/* Right Section with Content Boxes */}
// //                     <div className="ml-6 w-full ">
// //                       {/* Box 1 */}
// //                       <div className="mb-8 shadow-md rounded-lg  p-4">
// //                         <h3 className="font-semibold text-[#6E2D79] text-[21px] mb-4">Immediate Practical Applications</h3>
// //                         <div className="space-y-3">
// //                           {[
// //                             "Apply positive suggestions for self-transformation",
// //                             "Learn to meditate significantly well",
// //                             "Techniques to sleep better naturally",
// //                             "Understand your personal communication processing style",
// //                             "Develop self-hypnosis skills for daily use"
// //                           ].map((item, idx) => (
// //                             <div key={idx} className="flex items-start gap-3">
// //                               <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2"></div>
// //                               <span className="text-[#6E2D79]">{item}</span>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>

// //                       {/* Box 2 */}
// //                       <div className="mb-8 p-4">
// //                         <h3 className="font-semibold text-[#6E2D79] text-[21px] mb-4">Long-Term Transformational Outcomes</h3>
// //                         <div className="space-y-3">
// //                           {[
// //                             "Improved self-awareness and perception",
// //                             "Enhanced ability to manage thoughts and emotions",
// //                             "Greater control over your personal development",
// //                             "Foundation for advanced hypnotherapy studies",
// //                             "Tools for continuous self-improvement"
// //                           ].map((item, idx) => (
// //                             <div key={idx} className="flex items-start gap-3">
// //                               <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2"></div>
// //                               <span className="text-[#6E2D79]">{item}</span>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>


// //           {/* Right Section - 1/4 width on large screens */}
// //           <div className="lg:col-span-1 w-full">

// //             <div
// //               className="rounded-[10px] p-6 text-white flex flex-col"
// //               style={{
// //                 height: "450px",
// //                 backgroundColor: "#6E2D79",
// //               }}
// //             >
// //               <div className="mb-6">
// //                 <div
// //                   className="flex flex-col justify-center mb-2"
// //                   style={{
// //                     width: "166.25px",
// //                     height: "35.84px",
// //                     fontSize: "22.225px",
// //                     opacity: 0.9,
// //                   }}
// //                 >
// //                   Enroll in Level 1
// //                 </div>

// //                 <div className="font-bold mb-2 text-[22.225px]">$399</div>
// //                 <div className="text-sm opacity-90 mt-6">Next session starts: June 15, 2024</div>
// //               </div>

// //               <ul className="list-disc text-[15px] space-y-2 pl-5 marker:text-white marker:text-[10px] mb-4">
// //                 <li>1-Day Intensive Workshop</li>
// //                 <li>Course Materials Included</li>
// //                 <li>Certificate of Completion</li>
// //                 <li>Access to Online Resources</li>
// //               </ul>

// //               {/* Button pushed to bottom using mt-auto */}
// //               <button
// //                 onClick={() => setIsModalOpen(true)}
// //                 className="text-white font-semibold transition-colors text-center mt-auto hover:opacity-90 cursor-pointer"
// //                 style={{
// //                   borderRadius: "30px",
// //                   background: "#C183B2",
// //                   display: "flex",
// //                   width: "270.67px",
// //                   height: "49.59px",
// //                   justifyContent: "center",
// //                   alignItems: "center",
// //                   flexShrink: 0,
// //                 }}
// //               >
// //                 Enroll Now
// //               </button>
// //             </div>


// //             <div className="bg-white rounded-xl p-6 mt-6 shadow-sm h-[201.63px]">
// //               <div
// //                 className="flex flex-col items-start  h-full"
// //                 style={{ borderColor: "#6E2D79", }}
// //               >
// //                 <h3
// //                   className="mb-2 font-bold flex flex-col justify-center"
// //                   style={{
// //                     color: "#4A2C82",
// //                     fontSize: "21px",
// //                     lineHeight: "35.84px",
// //                     height: "35.84px",
// //                     flexShrink: 0,
// //                   }}
// //                 >
// //                   Have Questions?
// //                 </h3>

// //                 <p
// //                   className="mb-3 flex flex-col justify-center text-start"
// //                   style={{
// //                     color: "#333",
// //                     fontSize: "15.125px",
// //                     lineHeight: "25.6px",
// //                     height: "46.59px",
// //                     flexShrink: 0,
// //                     fontWeight: 400,
// //                   }}
// //                 >
// //                   Got a query to help you understand if this course is right for you?
// //                 </p>

// //                 <button
// //                   className="text-white text-sm transition-colors inline-flex items-center justify-center gap-2"
// //                   style={{
// //                     padding: "11px 42px",
// //                     borderRadius: "30px",
// //                     background: "#6E2D79",
// //                   }}
// //                 >
// //                   counsellor@nurturego.com
// //                 </button>
// //               </div>
// //             </div>


// //             {/* Instructor Card */}
// //             <div className="bg-white rounded-xl p-6 mt-6 shadow-sm max-w-md">
// //               <div className="flex items-start gap-4">
// //                 {/* Profile Image */}
// //                 <div className="flex-shrink-0">
// //                   <img
// //                     src="/decode/Instructor.svg"
// //                     alt="Lead Instructor"
// //                     className="w-16 h-16 rounded-full object-cover"
// //                   />
// //                 </div>

// //                 {/* Content */}
// //                 <div>
// //                   <h4 className="font-semibold text-gray-900">Lead Instructor</h4>
// //                   <p className="text-gray-800">Certified Clinical Hypnotherapist</p>
// //                   <p className="text-gray-700 mb-3">15+ Years Experience</p>
// //                   <p className="text-gray-600 text-sm">
// //                     Our instructors combine scientific knowledge with practical therapeutic experience to deliver transformative learning.
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>


// //             {/* Brand Logo */}
// //             <div className="flex mt-16 justify-center space-x-2">
// //               <img
// //                 src="/logo.svg"
// //                 alt="Ekaa Logo"
// //                 className="w-[211px] h-[234px] object-contain"
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Registration Form Modal */}
// //       {isModalOpen && (
// //         <FormPage/>
// //       )}
// //     </div>
// //   );
// // }




















import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormPage from './FormPage';

export default function DynamicDecodePage({ levelData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };




  const scheduleData = [
    { city: 'Dallas', venue: 'Abc', date: 'Jun 15, 2025', time: '10:00 AM' },
    { city: 'Texas', venue: 'Xyz', date: 'Jun 20, 2025', time: '2:00 PM' },
    { city: 'Houston', venue: 'Rty', date: 'Jul 1, 2025', time: '9:00 AM' },
    { city: 'Austin', venue: 'Abcz', date: 'Jun 25, 2025', time: '11:00 AM' },
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
                      <span className="text-white font-semibold text-sm sm:text-base">1</span>
                    </div>
                    <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">What You'll Learn</h2>
                  </div>
                  <div className='bg-[#C183B2] h-[2px] mb-4'></div>
                  <div className="flex flex-col lg:flex-row">
                    {/* Left Section with Image */}
                    <div className="hidden lg:flex w-auto items-center justify-center mb-4 lg:mb-0">
                      <div className="w-[40px] h-[200px] sm:w-[59px] sm:h-[343px] flex items-center">
                        <img src="/2.2.svg" alt="Leaf" className="w-auto h-full object-contain" />
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
                                <strong>{item.heading}</strong> {item.description}
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
                      <span className="text-white font-semibold text-sm sm:text-base">2</span>
                    </div>
                    <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">Course Benefits</h2>
                  </div>
                  <div className='bg-[#C183B2] h-[2px] mb-4'></div>
                  <div className="flex flex-col lg:flex-row">
                    {/* Left Section with Image */}
                    <div className="hidden lg:flex w-auto items-center justify-center mb-4 lg:mb-0">
                      <div className="w-[40px] h-[200px] sm:w-[59px] sm:h-[343px] flex items-center">
                        <img src="/2.2.svg" alt="Leaf" className="w-auto h-full object-contain" />
                      </div>
                    </div>

                    {/* Right Section with Content Boxes */}
                    <div className="ml-0 lg:ml-6 w-full">
                      {/* Immediate Benefits */}
                      <div className="mb-6 sm:mb-8 shadow-md rounded-lg p-3 sm:p-4">
                        <h3 className="font-semibold text-[#6E2D79] text-[18px] sm:text-[21px] mb-4">Immediate Practical Applications</h3>
                        <div className="space-y-3">
                          {levelData.immediate_benefits.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2"></div>
                              <span className="text-[#6E2D79] text-sm sm:text-base">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Long-term Benefits */}
                      <div className="mb-6 sm:mb-8 p-3 sm:p-4">
                        <h3 className="font-semibold text-[#6E2D79] text-[18px] sm:text-[21px] mb-4">Long-Term Transformational Outcomes</h3>
                        <div className="space-y-3">
                          {levelData.long_term_benefits.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-[#C183B2] rounded-full mt-2"></div>
                              <span className="text-[#6E2D79] text-sm sm:text-base">{item}</span>
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

                <div className="font-bold mb-2 text-[20px] sm:text-[22.225px]">{levelData.price}</div>
                <div className="text-sm opacity-90 mt-4 sm:mt-6">Next session starts: {levelData.next_session}</div>
              </div>

              <ul className="list-disc text-[14px] sm:text-[15px] space-y-2 pl-5 marker:text-white marker:text-[10px] mb-4">
                {levelData.enrollment_features.map((feature, idx) => (
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
              >
                Enroll Now
              </button>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 mt-6 shadow-sm">
              <div className="flex flex-col items-start h-full" style={{ borderColor: "#6E2D79" }}>
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

      <section className="">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#C183B2] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm sm:text-base">3</span>
              </div>
              <h2 className="text-[20px] sm:text-[24px] text-[#6E2D79] font-semibold">Upcoming Workshop</h2>
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
                  <tr key={idx} className=" border-t border-[#A35F93] text-sm sm:text-base">
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
      {isModalOpen && (
        <FormPage onClose={handleCloseModal} />
      )}
    </div>
  );
}











