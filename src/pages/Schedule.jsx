import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TestimonialCarousel from "../components/home/Testimonials";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
const events = [
  {
    id: 9,
    name: "DECODE The Child",
    seats: "Not Limited",
    date: "10th Aug",
    location: "Houston, USA",
    trainer: "Dr. Alyasowmy's A/C",
    type: "Family Constellations",
    price: "USD 35",
    currency: "USD",
    priceValue: 15999,
    facilitator: "Yuvraj Kapadia",
    link: "/level/5?modal=true",
    participants: "10 Seats",
  },
  {
    id: 8,
    name: "Masterclass for Corporates",
    seats: "Not Limited",
    date: "1tth Aug",
    location: "Houston, USA",
    trainer: "",
    type: "Family Constellations",
    price: "USD 375",
    currency: "USD",
    priceValue: 25999,
    facilitator: "Yuvraj Kapadia",
    link: "/family-constellation?id=6&modal=true",
    participants: "10 Seats",
    noenroll: true,
  },
  {
    id: 2,
    name: "Family Constellation",
    seats: 10,
    date: "12th Aug",
    location: "Houston, USA",
    trainer: "Dr. Alyasowmy's A/C",
    type: "Family Constellations",
    price: "USD 375",
    currency: "USD",
    priceValue: 15999,
    facilitator: "Yuvraj Kapadia",
    link: "/family-constellation?id=1&modal=true",
    participants: "10 Seats",
  },
  {
    id: 3,
    name: "Level 3 of Hypnotherapy Training, Advanced Course in Integrated Hypnotic Modalities for Health Resolutions",
    seats: "Not Limited",
    date: "13th–17th Aug",
    location: "Houston, USA",
    trainer: "Dr. Alyasowmy's A/C",
    type: "CH",
    price: "USD 1500",
    currency: "USD",
    priceValue: 12999,
    facilitator: "Yuvraj Kapadia",
    link: "/ich/levels?level=3&modal=true",
    participants: "10 Seats",
  },
  {
    id: 4,
    name: "Family Constellation",
    seats: 10,
    date: "18th Aug",
    location: "Houston, USA",
    trainer: "Dr. Alyasowmy's A/C",
    type: "Family Constellations",
    price: "USD 375",
    currency: "USD",
    priceValue: 12999,
    facilitator: "Yuvraj Kapadia",
    link: "/family-constellation?id=2&modal=true",
    participants: "10 Seats",
  },
  {
    id: 1,
    name: "Level 1 of Hypnotherapy Training, Basic Course in Integrated Clinical Hypnotherapy Certification",
    seats: "Not Limited",
    date: "20th–21st Aug",
    location: "Austin, USA",
    trainer: "Dr. Monoj's A/C",
    type: "CH",
    price: "USD 600",
    currency: "USD",
    priceValue: 600,
    facilitator: "Yuvraj Kapadia",
    link: "/ich/levels?level=1&modal=true",
    participants: "10 Seats",
  },
  {
    id: 5,
    name: "Family Constellation",
    seats: 10,
    date: "22nd Aug",
    location: "Austin, USA",
    trainer: "Dr. Monoj's A/C",
    type: "Family Constellations",
    price: "USD 375",
    currency: "USD",
    priceValue: 5999,
    facilitator: "Yuvraj Kapadia",
    link: "/family-constellation?id=3&modal=true",
    participants: "10 Seats",
  },

  {
    id: 6,
    name: "Family Constellation",
    seats: 10,
    date: "23rd Aug",
    location: "Austin, USA",
    trainer: "Dr. Monoj's A/C",
    type: "Family Constellations",
    price: "USD 375",
    currency: "USD",
    priceValue: 6500,
    facilitator: "Yuvraj Kapadia",
    link: "/family-constellation?id=4&modal=true",
    participants: "10 Seats",
  },
  {
    id: 10,
    name: "Masterclass for doctors",
    seats: "Not Limited",
    date: "27th Aug",
    location: "Houston, USA",
    trainer: "",
    type: "Family Constellations",
    price: "USD 375",
    currency: "USD",
    priceValue: 25999,
    facilitator: "Yuvraj Kapadia",
    link: "/family-constellation?id=6&modal=true",
    participants: "10 Seats",
    noenroll: true,
  },
  {
    id: 7,
    name: "Family Constellation",
     seats: "Not Limited",
    date: "28th Aug",
    location: "Woodlands, USA",
    trainer: "Dr. Monoj's A/C",
    type: "Family Constellations",
    price: "USD 375",
    currency: "USD",
    priceValue: 349,
    facilitator: "Yuvraj Kapadia",
    link: "/family-constellation?id=5&modal=true",
    participants: "10 Seats",
  },
  {
    id: 8,
    name: "Decode Your Mind",
    seats: 10,
    date: "31th Aug-1st sept",
    location: "San Diego, USA",
    trainer: "Dr. Sonia Gupte's A/C",
    type: "decode",
    price: "USD 600",
    currency: "USD",
    priceValue: 349,
    facilitator: "Yuvraj Kapadia",
       link: "/level/1?modal=true",
    participants: "10 Seats",
  },
];
function Schedule() {
  const navigate = useNavigate();
  const handleRegister = (event) => {
    // Navigate to registration page with event ID
    navigate(`${event}`);
  };
  return (
    <div
      className="relative w-full flex flex-col overflow-x-hidden"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <motion.section
        className="relative mb-4 flex flex-col justify-center items-center text-center px-4 pt-[120px] md:pt-[160px] w-full h-[calc(800px-80px)] md:h-[700px] lg:h-[700px] bg-center bg-no-repeat  bg-cover "
        style={{
          backgroundImage: "url('/decode/Hero Image.svg')",
          height: "541px",
          flexShrink: 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 30% 50%, rgba(244,234,253,0.8) 0%, transparent 20%)",
              "radial-gradient(circle at 70% 30%, rgba(32,178,170,0.5) 0%, transparent 25%)",
              "radial-gradient(circle at 30% 50%, rgba(244,234,253,0.8) 0%, transparent 20%)",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto">
          <motion.h1
            className="text-[26px] lg:text-[36px] sm:text-[32px] md:text-[36px] font-semibold mb-6 drop-shadow-lg text-[#6E2D79]"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Event Calendar
          </motion.h1>

          <motion.p
            className="text-[14px] sm:text-[14px] md:text-[18px] lg:text-[18px] text-[#6E2D79]/90 max-w-3xl mb-10 w-full md:w-[796px] drop-shadow-md font-normal"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore the upcoming programs and reserve your spot today.
          </motion.p>

          <motion.div
            className="w-full h-px bg-[#6E2D79]/30 mb-12"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          />

          {/* Enhanced Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-sm mb-2 text-[#6E2D79] font-medium tracking-wider">
              SCROLL TO EXPLORE
            </p>

            <motion.div
              className="relative h-10 w-6 rounded-full border-2 border-[#6E2D79] flex justify-center p-1"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-1 h-3 bg-[#6E2D79] rounded-full"
                animate={{
                  y: [0, 4, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />
            </motion.div>

            <p className="text-xs mt-3 opacity-70 text-[#6E2D79] font-light">
              0
            </p>
          </motion.div>
        </div>

        {/* Animated floating circles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#6E2D79]/10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.section>
      <div className="px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#6E2D79]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                    Event
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                    Facilitator
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                    Total Participants
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                    Program Fees
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event, index) => (
                  <motion.tr
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                    className="group"
                  >
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#2D2D2D]">
                          {event.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-[#2D2D2D] whitespace-nowrap">
                        {event.date}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-[#2D2D2D]">
                        {event.location}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-[#2D2D2D]">
                        {event.facilitator || "-"}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <span className={`px-2 py-1 rounded-full`}>
                          {event.seats}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {event.noenroll ? (
                        <span className="text-sm text-[#2D2D2D]">-</span>
                      ) : (
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            event.currency === "AED"
                              ? "bg-blue-100 text-blue-800"
                              : event.currency === "USD"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {event.price}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {event.noenroll ? (
                        <span className="text-sm text-[#2D2D2D]">-</span>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRegister(event.link)}
                          className="px-3 py-2 bg-[#6E2D79] text-white text-xs rounded-md hover:bg-[#5a2465] transition-colors cursor-pointer"
                        >
                          Enroll Now
                        </motion.button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
      <TestimonialCarousel />
      <Footer />
    </div>
  );
}

export default Schedule;
