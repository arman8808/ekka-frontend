import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const questions = [
    {
      id: 1,
      question: "Why is Webflow the best nocode tool?",
      answer:
        "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor",
    },
    {
      id: 2,
      question: "When did Webflow was founded?",
      answer:
        "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor",
    },
    {
      id: 3,
      question: "Who founded BRIX Templates?",
      answer:
        "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor",
    },
    {
      id: 4,
      question: "Who are the Webflow founders?",
      answer:
        "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor",
    },
    {
      id: 5,
      question: "Is NoCode the future of the web?",
      answer:
        "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor",
    },
    {
      id: 6,
      question: "Can I use Webflow for eCommerce?",
      answer:
        "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor",
    },
  ];

  // Component for individual FAQ item
  const FAQItem = ({ faq, index, className = "" }) => {
    const isOpen = openIndex === index;

    return (
      <article
        className={`
                w-full bg-white rounded-2xl transition-all duration-300 ease-in-out
                shadow-[0px_5px_16px_rgba(8,15,52,0.06)] hover:shadow-[0px_8px_24px_rgba(8,15,52,0.12)]
                border-2 border-transparent hover:border-[#6E2D79] ${
                  isOpen ? "border-[#6E2D79]" : ""
                }
                ${className}
            `}
        style={{
          minHeight: isOpen ? "auto" : "clamp(100px, 15vw, 122px)",
        }}
      >
        <button
          onClick={() => toggleFAQ(index)}
          className={`
                    w-full p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8
                    flex justify-between items-start gap-3 sm:gap-4 lg:gap-6
                    text-left transition-colors duration-200 cursor-pointer
                    rounded-2xl
                    ${!isOpen ? "h-full items-center" : ""}
                `}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
        >
          <span
            className={`
                        font-poppins font-medium flex-1 transition-colors duration-200
                        text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
                        leading-tight sm:leading-snug md:leading-normal
                        ${
                          isOpen
                            ? "text-[#6E2D79]"
                            : "text-[#6E2D79] hover:text-[#6E2D79]"
                        }
                        flex items-start
                    `}
          >
            {/* Numbering added here */}
            <span className="font-bold mr-2">{index + 1}.</span>
            {faq.question}
          </span>
{/* 
          <span className="text-[#6E2D79] flex-shrink-0 transition-transform duration-200 hover:scale-110">
            {isOpen ? (
              <Minus
                size={
                  window.innerWidth < 640
                    ? 18
                    : window.innerWidth < 1024
                    ? 20
                    : 24
                }
                className="transition-transform duration-200"
              />
            ) : (
              <Plus
                size={
                  window.innerWidth < 640
                    ? 18
                    : window.innerWidth < 1024
                    ? 20
                    : 24
                }
                className="transition-transform duration-200"
              />
            )}
          </span> */}
        </button>

        {/* Answer Content with Smooth Animation */}
        {/* <div
          id={`faq-answer-${index}`}
          className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                `}
        >
          <div className="px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 pb-4 sm:pb-5 md:pb-6 lg:pb-7 xl:pb-8">
            <p
              className="
                        font-poppins font-normal text-[#A35F93] 
                        text-xs sm:text-sm md:text-base lg:text-lg
                        leading-relaxed
                        transform transition-transform duration-300
                        ${isOpen ? 'translate-y-0' : 'translate-y-2'}
                    "
            >
              {faq.answer}
            </p>
          </div>
        </div> */}
      </article>
    );
  };

  return (
    <section className="w-full bg-white py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="mb-6 sm:mb-8 lg:mb-12"
          >
            <h2 className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[24px] font-medium text-[#6E2D79] mb-2 sm:mb-3 lg:mb-4 leading-tight">
              FAQs
            </h2>
            <p className="text-[14px]  sm:text-[14px] md:text-[18px] lg:text-[18px] text-[#A35F93] mb-4 sm:mb-6 lg:mb-8 max-w-sm sm:max-w-md lg:max-w-lg mx-auto leading-relaxed">
              Answers to what you're thinking.
            </p>
          </motion.div>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          {/* <div className="block lg:hidden space-y-4 sm:space-y-5 md:space-y-6">
            {questions.map((faq, index) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                index={index}
                className="max-w-full"
              />
            ))}
          </div> */}

          {/* <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6 xl:gap-8 2xl:gap-10">

            <div className="space-y-5 lg:space-y-6 xl:space-y-7">
              {questions
                .filter((_, index) => index % 2 === 0)
                .map((faq, arrayIndex) => {
                  const originalIndex = arrayIndex * 2;
                  return (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.6,
                        delay: originalIndex * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <FAQItem
                        faq={faq}
                        index={originalIndex}
                        className="w-full"
                      />
                    </motion.div>
                  );
                })}
            </div>

            <div className="space-y-5 lg:space-y-6 xl:space-y-7">
              {questions
                .filter((_, index) => index % 2 !== 0)
                .map((faq, arrayIndex) => {
                  const originalIndex = arrayIndex * 2 + 1;
                  return (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.6,
                        delay: originalIndex * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <FAQItem
                        faq={faq}
                        index={originalIndex}
                        className="w-full"
                      />
                    </motion.div>
                  );
                })}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
