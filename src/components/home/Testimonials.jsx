import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Albert Flores',
    role: 'Product Manager at Jomanar',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: '/peoplesay/image 6.svg',
  },
  {
    id: 2,
    name: 'Albert Flores',
    role: 'Product Manager at Jomanar',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: '/peoplesay/image 7.svg',
  },
  {
    id: 3,
    name: 'Albert Flores',
    role: 'Product Manager at Jomanar',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: '/peoplesay/image 6.svg',
  },
  {
    id: 4,
    name: 'Albert Flores',
    role: 'Product Manager at Jomanar',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: '/peoplesay/image 7.svg',
  },
  {
    id: 5,
    name: 'Albert Flores',
    role: 'Product Manager at Jomanar',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: '/peoplesay/image 8.svg',
  }
];

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [playing, setPlaying] = useState(null);

  const getVisibleTestimonials = () => {
    const totalItems = testimonials.length;
    const prev = (activeIndex - 1 + totalItems) % totalItems;
    const next = (activeIndex + 1) % totalItems;
    return [prev, activeIndex, next];
  };

  const handlePrev = () => {
    setPlaying(null);
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setPlaying(null);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handleVideoClick = (id) => {
    setPlaying(playing === id ? null : id);
  };

  useEffect(() => {
    setPlaying(null);
  }, [activeIndex]);

  const visibleIndexes = getVisibleTestimonials();

  return (
    <div
      className="bg-cover bg-center bg-no-repeat w-full flex flex-col items-center justify-center py-8 sm:py-16 px-4 sm:px-6 lg:px-8 my-8"
      style={{ backgroundImage: "url('/What People Say bg.svg')" }}
    >
      <div className="max-w-7xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className="mb-6 sm:mb-8 lg:mb-12"
        >
          <div className="text-center mb-8 sm:mb-12 px-2 sm:px-0">
            <h2 className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[24px] font-medium text-[#6E2D79] mb-2 sm:mb-3 lg:mb-4 leading-tight">
              What People Say
            </h2>
            <p className="text-[14px] sm:text-[14px] md:text-[18px] lg:text-[18px] text-[#A35F93] mb-4 sm:mb-6 lg:mb-8 max-w-sm sm:max-w-md lg:max-w-lg mx-auto leading-relaxed">
              Real stories. Lasting impact.
            </p>
          </div>
        </motion.div>

        <div className="relative w-full">
          {/* Mobile View */}
          <div className="sm:hidden flex justify-center">
            <div className="w-full max-w-xs relative">
              <div
                className="transition-all duration-300 ease-in-out rounded-2xl overflow-hidden shadow-lg w-full"
                style={{ aspectRatio: '3 / 4' }}
              >
                {(() => {
                  const item = testimonials[activeIndex];
                  return playing === item.id ? (
                    <video
                      src={item.video}
                      controls
                      autoPlay
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <div
                      onClick={() => handleVideoClick(item.id)}
                      className="cursor-pointer relative w-full h-full"
                    >
                      <img
                        src={item.thumbnail}
                        alt={`${item.name} testimonial`}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-2xl">
                        <div className="bg-white/30 p-3 rounded-full">
                          <Play className="text-white" size={24} />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-4 text-white rounded-b-2xl">
                        <p className="font-medium text-base">{item.name}</p>
                        <p className="text-sm text-gray-300">{item.role}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden sm:flex justify-center items-start gap-4 md:gap-6 min-h-[450px] md:min-h-[500px] relative">
            {visibleIndexes.map((index) => {
              const item = testimonials[index];
              return (
                <div
                  key={`${item.id}-${activeIndex}`}
                  className="rounded-2xl overflow-hidden shadow-lg w-56 md:w-72 lg:w-80 cursor-pointer transition-all duration-300 ease-in-out"
                  style={{ aspectRatio: '3 / 4' }}
                  onClick={() => handleVideoClick(item.id)}
                >
                  {playing === item.id ? (
                    <video
                      src={item.video}
                      controls
                      autoPlay
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={item.thumbnail}
                        alt={`${item.name} testimonial`}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-2xl">
                        <motion.div
                          className="bg-white/30 p-3 rounded-full"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Play className="text-white" size={24} />
                        </motion.div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-4 text-white rounded-b-2xl">
                        <p className="font-medium text-sm md:text-base">{item.name}</p>
                        <p className="text-xs md:text-sm text-gray-300">{item.role}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8 sm:mt-12">
            <motion.button
              onClick={handlePrev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C183B2] text-white  flex items-center justify-center  transition-colors duration-300"
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              onClick={handleNext}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#6E2D79] text-white flex items-center justify-center  transition-colors duration-300"
              aria-label="Next testimonial"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;