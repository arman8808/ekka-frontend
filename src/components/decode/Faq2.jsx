import React from "react";
import { motion } from "framer-motion";

const Faq2 = () => {
  const questions = [
    {
      id: 1,
      question: "What integrations do you support?",
      answer:
        "We can support platforms integrated with Checkout, Billing, and Invoicing. We can't support PaymentIntent users but if you're a platform interested in building your own UI for one-off payments, we'd love to hear from you!",
    },
    {
      id: 2,
      question: "What is the waiting period for my first payout?",
      answer:
        "Pellentesque neque in vitae turpis dapibus diam duis amet. Arcu augue blandit auctor auctor varius dui consectetur. Ac mattis dapibus volutpat, pulvinar eget sed sit nisi.",
    },
    {
      id: 3,
      question: "Can I withdraw my money anytime?",
      answer:
        "Yes, Stripe allows you to opt for a payout whenever you want. You can also opt for a scheduled payout every month.",
    },
    {
      id: 4,
      question: "Do you support PO box addresses?",
      answer:
        "In general, PO Boxes aren't part of our US address database. If the address for a PO Box or other address can't be found, the location is approximated using the rest of the address details.",
    },
  ];

  return (
    <section className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-[#6E2D79] text-2xl md:text-3xl font-semibold mb-2">
            FAQs
          </h2>
          <p className="text-[#A35F93] text-base md:text-lg">
            Answers to what you're thinking.
          </p>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 py-8">
          {questions.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:border-[#6E2D79] transition-all duration-300"
            >
              <h3 className="text-[#6E2D79] font-semibold text-[24px] mb-2 flex items-start">
                <span className="mr-2">{index + 1}.</span> {faq.question}
              </h3>
              <p className="text-[#A35F93] text-[18px] leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Faq2;