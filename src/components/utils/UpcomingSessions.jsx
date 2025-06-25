import { useState } from "react";
import React from "react";
import FamilySessionForm from "./FamilySessionForm";
import { motion, AnimatePresence } from "framer-motion";
const UpcomingSessions = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const sessions = [
    {
      id: 1,
      Venue: "Decode Foundation",
      date: "June 15, 2025",
      time: "9:00  - 17:00 GMT-7",
      capacity: "8 Seats",
      price: "$ 375",
      status: "Open",
    },
  ];

  const handleEnroll = (session) => {
    setSelectedWorkshop(session);
     setSelectedSession(session);
    setShowModal(true);
  };

  return (
    <div className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[1.5rem] font-normal text-center text-[#6E2D79] mb-12">
          Programs Details
        </h2>

        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden border border-[#C183B2] p-4 rounded-2xl">
              <table className="min-w-full divide-y divide-[#C183B2]">
                <thead>
                  <tr className="bg-[#6E2D79]">
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold text-white uppercase tracking-wider rounded-tl-2xl"
                    >
                      Venue
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold text-white uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold text-white uppercase tracking-wider"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold text-white uppercase tracking-wider"
                    >
                      Capacity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold text-white uppercase tracking-wider"
                    >
                      Price
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold text-white uppercase tracking-wider"
                    ></th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold text-white uppercase tracking-wider rounded-tr-2xl"
                    ></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#C183B2]">
                  {sessions.map((session) => (
                    <tr
                      key={session.id}
                      className="hover:bg-purple-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-[#6E2D79]">
                        {session.Venue}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-base text-[#6E2D79]">
                        {session.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-[#6E2D79]">
                        {session.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-[#6E2D79]">
                        {session.capacity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-[#6E2D79]">
                        {session.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base">
                        <span
                          className="px-3 py-1 rounded-full text-base font-medium"
                          style={{
                            backgroundColor: "#4ECDC41A",
                            color: "#1E7D78",
                          }}
                        >
                          {session.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base">
                        <button
                          onClick={() => handleEnroll(session)}
                          className="px-4 py-2 bg-[#6E2D79] text-white rounded-lg hover:bg-[#8a3c97] transition-colors shadow-sm text-base"
                        >
                          Enroll Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            <FamilySessionForm
              onClose={() => setShowModal(false)}
              selectedSession={selectedSession}
              availableSessions={[selectedSession]}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default UpcomingSessions;
