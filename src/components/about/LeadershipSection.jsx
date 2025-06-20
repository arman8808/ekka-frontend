import React from "react";

const LeadershipSection = () => {
  return (
    <div className="bg-white px-4 sm:px-6 lg:px-12 py-22">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">
        {/* Left: Text */}
        <div className="flex-1 text-[#5E3D8A] order-2 md:order-1">
          <h2 className="text-xl sm:text-2xl leading-[24px] font-medium text-[#6E2D79] font-poppins mb-2">
            Abhishek Kapadia
          </h2>
          <p className="text-base sm:text-lg leading-[30px] text-[#A35F93] font-medium">
            Abhishek Yuvraj Kapadia officially joined EKAA in January 2015 as
            the Strategic Business Head. With a fresh, dynamic approach, he has
            played a key role in expanding EKAA's presence to several new
            international locations including Muscat, Kenya, Lebanon, and the
            United States, in addition to existing branches in Dubai and Hong
            Kong. He holds two degrees with distinction—Bachelor of Business and
            Bachelor of Science in Information Technology—from the University of
            Sydney (UTS). Abhishek divides his time between India and Sydney,
            Australia, balancing a career in holistic wellness with his passion
            for music as a guitarist and vocalist in his rock band "ADAPTORS."
            His previous work experience spans from 2005 to 2015 in strategic
            roles with companies like Focus Technologies and The Cancer Council
            in New South Wales. Through his leadership, EKAA has introduced new
            projects and streamlined operations, driven by his vision to make
            EKAA the go-to organization for alternative healing.
          </p>
        </div>

        {/* Right: Image */}
        <img
          src="/about/abhiskhek.png"
          alt="Abhishek Kapadia"
          className="w-full max-w-[431px] h-auto md:h-[428px] object-cover shadow-lg order-1 md:order-2"
        />
      </div>

      {/* Horizontal Line */}
      <div className="relative w-full my-8">
        {/* Horizontal Line */}
        <div className="w-full h-[1px] bg-[#B879D3]"></div>

        {/* Left Circle */}
        <div className="w-2 h-2 bg-[#B879D3] rounded-full absolute top-1/2 -translate-y-1/2 left-0"></div>

        {/* Right Circle */}
        <div className="w-2 h-2 bg-[#B879D3] rounded-full absolute top-1/2 -translate-y-1/2 right-0"></div>
      </div>

      {/* Bottom Section */}
     <div className="flex flex-col md:flex-row justify-between items-center gap-10 mt-12">
  {/* Left: Image */}
  <img
    src="/about/priya.png"
    alt="Priya KP"
    className="w-full max-w-[431px] h-auto md:h-[428px] object-cover shadow-lg"
  />

  {/* Right: Text */}
  <div className="flex-1 text-[#5E3D8A]">
    <h2 className="text-xl sm:text-2xl leading-[24px] font-medium text-[#6E2D79] font-poppins mb-2">
      Priya KP
    </h2>
    <p className="text-base sm:text-lg leading-[30px] text-[#A35F93] font-medium">
      Priya K. P holds a Master's in Microbiology from Bangalore
      University and an Advanced Diploma in Counselling and Psychology
      from Australia. She has played a pivotal role in transforming CHII
      into EKAA, a global leader in integrated clinical hypnotherapy. With
      certifications in Movement Therapy (CMTAI) and Transactional
      Analysis, her interests span early childhood development, youth
      wellbeing, and family systems.
    </p>
    <p className="text-base sm:text-lg leading-[30px] text-[#A35F93] font-medium mt-2">
      Priya brings vast experience from multinational corporates,
      combining strategic thinking with creative vision and strong
      governance. She excels at streamlining systems, introducing
      compliance frameworks, and leading organisational change. At EKAA,
      she supervises training content, certifies teachers and students,
      and drives innovation in workshops and programs.
    </p>
    <p className="text-base sm:text-lg leading-[30px] text-[#A35F93] font-medium mt-2">
      Her global outlook is enriched through regular participation in
      international seminars. She is passionate about reducing toxic
      stress in children, preventing emotional abuse, addressing the
      impact of COVID-19 on families and youth, and empowering women in
      business. Priya continues to shape EKAA's mission with empathy,
      vision, and excellence.
    </p>
  </div>
</div>
    </div>
  );
};

export default LeadershipSection;
