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
          <div className="text-base sm:text-lg leading-[30px] text-[#A35F93] font-normal space-y-4">
            <p>
              Abhishek took on the role of Strategic Business Head at EKAA in
              January 2015 with a single, powerful vision—to scale EKAA into a
              global benchmark for holistic wellness and alternative healing.
              Over the years, he has transformed that vision into a thriving
              reality, leading EKAA through an era of unprecedented growth,
              innovation, and international recognition.
            </p>

            <p>
              With a forward-thinking, entrepreneurial approach, Abhishek has
              expanded EKAA's presence to new territories across the world,
              including Oman, Kenya, Singapore, Lebanon, and the United States,
              while strengthening its strongholds in Dubai and Hong Kong. His
              leadership has redefined the organization's global strategy,
              opening doors to new business ventures, partnerships, and
              opportunities that align with EKAA's mission to touch lives
              through integrated healing practices.
            </p>

            <p>
              A firm believer in the power of accessibility and technology,
              Abhishek has spearheaded EKAA's digital transformation—building a
              robust online presence and virtual learning platforms that have
              made EKAA's programs available to students and practitioners
              worldwide. His focus on innovation and scalability has not only
              streamlined operations but has also elevated EKAA's reputation as
              a trusted and forward-looking institution in the holistic wellness
              space.
            </p>

            <p>
              Guided by his vision of making alternative healing a mainstream
              and respected discipline, Abhishek continues to lead EKAA with
              passion, strategic insight, and a relentless drive for excellence.
              Under his stewardship, EKAA is poised to reach new heights,
              becoming the global leader in holistic wellness education and
              services.
            </p>
          </div>
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
          <div className="text-base sm:text-lg leading-[30px] text-[#A35F93] font-normal space-y-4">
            <p>
              Priya has been an integral force behind EKAA's evolution and
              expansion since officially stepping into her role as Director in
              2011. With a Master's degree in Microbiology from Bangalore
              University and an Advanced Diploma in Psychology and Counselling
              from ICI, Sydney, she brings a unique combination of scientific
              insight and therapeutic depth to EKAA's leadership.
            </p>

            <p>
              Priya has been central to shaping the organization's internal
              structure, philosophy, and offerings. She was instrumental in
              guiding the transformation from CHII to EKAA, laying the
              groundwork for what has now become a globally respected
              institution in Integrated Clinical Hypnotherapy.
            </p>

            <p>
              As the head of quality control across EKAA, Priya ensures that the
              highest standards are maintained across all programs,
              facilitators, and student experiences. She is also the certifying
              authority for all EKAA graduates and personally conducts the final
              interviews with each student—an essential step that reflects her
              unwavering commitment to professional integrity and the
              transformative power of the work.
            </p>

            <p>
              She is the visionary behind many of EKAA's signature retreats and
              specialized modules, designing immersive experiences that blend
              therapeutic rigor with personal growth. Her creativity and
              precision have led to the development of breakthrough programs
              that address emotional healing, trauma release, and mind-body
              wellness.
            </p>

            <p>
              Priya's work extends beyond operations—she actively engages in
              global conversations around mental health, family systems, and
              early childhood development. Her incorporation of expressive
              modalities such as Movement Therapy adds a dynamic dimension to
              EKAA's approach, making it truly holistic and future-ready.
            </p>

            <p>
              With deep dedication, clarity of purpose, and a hands-on
              leadership style, Priya continues to shape EKAA's journey toward
              becoming the world's leading institution in holistic healing and
              Integrated Clinical Hypnotherapy.
            </p>
          </div>
        </div>
      </div>{" "}
      <div className="relative w-full my-8">
        {/* Horizontal Line */}
        <div className="w-full h-[1px] bg-[#B879D3]"></div>

        {/* Left Circle */}
        <div className="w-2 h-2 bg-[#B879D3] rounded-full absolute top-1/2 -translate-y-1/2 left-0"></div>

        {/* Right Circle */}
        <div className="w-2 h-2 bg-[#B879D3] rounded-full absolute top-1/2 -translate-y-1/2 right-0"></div>
      </div>
    </div>
  );
};

export default LeadershipSection;
