import React from "react";
import { motion } from "framer-motion";

const ProfileCard = () => {
  return (
    <div className="bg-[#6E2D79] text-white py-12 px-4 md:py-16 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch"
      >
        {/* Image Section - Full width/height */}
        <div className="w-full lg:w-1/2 flex">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[auto] overflow-hidden rounded-xl shadow-2xl"
          >
            <img
              src="/about/yuvraj.png"
              alt="Yuvraj Sir"
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center py-4 lg:py-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                About Facilitator
              </h1>
              <p className="text-xl md:text-2xl text-purple-200 italic font-light border-l-4 border-white/30 pl-4 py-1">
                Dr Yuvraj Kapadia , Master Facilitator & Transformational Guide
              </p>
            </div>

            <div className="space-y-4 text-lg">
              <p className="leading-relaxed md:leading-loose">
                With over <span className="font-semibold">12 years</span> of
                experience in family systems therapy, Yuvraj Sir has facilitated
                hundreds of constellation workshops across India. His gentle yet
                profound approach creates a safe container for deep healing
                work.
              </p>
              <p className="leading-relaxed md:leading-loose">
                Originally trained in psychology, Yuvraj discovered Family
                Constellations during his own healing journey and has since
                studied with masters in Europe and South America. He blends
                traditional wisdom with contemporary therapeutic approaches.
              </p>
            </div>

            <motion.a
              href="/about"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#ffffff",
                color: "#6E2D79",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-4 px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-lg border-2 border-white/20 hover:border-white/40 transition-all max-w-[200px]"
            >
              Know More
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
