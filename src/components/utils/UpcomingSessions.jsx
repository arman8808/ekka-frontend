import { useState } from "react";
import React from "react";
import FamilySessionForm from "./FamilySessionForm";
import { motion, AnimatePresence } from "framer-motion";
const UpcomingSessions = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState("");

  const sessions = [
    {
      id: 1,
      workshop: "Decode Foundation",
      city: "Mumbai",
      date: "June 15, 2023",
      time: "9:00 AM - 5:00 PM",
      capacity: "25 Seats",
      price: "₹ 4500",
      status: "Open",
    },
    {
      id: 2,
      workshop: "Healing Roots",
      city: "Delhi",
      date: "June 22, 2023",
      time: "10:00 AM - 6:00 PM",
      capacity: "20 Seats",
      price: "₹ 5000",
      status: "Open",
    },
    {
      id: 3,
      workshop: "Ancestral Connections",
      city: "Bangalore",
      date: "July 5, 2023",
      time: "9:30 AM - 5:30 PM",
      capacity: "18 Seats",
      price: "₹ 4800",
      status: "Open",
    },
    {
      id: 4,
      workshop: "Family Harmony",
      city: "Chennai",
      date: "July 15, 2023",
      time: "9:00 AM - 5:00 PM",
      capacity: "22 Seats",
      price: "₹ 4200",
      status: "Open",
    },
  ];

  const handleEnroll = (workshop) => {
    setSelectedWorkshop(workshop);
    setShowModal(true);
  };

  return (
    <div className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[1.5rem] font-normal text-center text-[#6E2D79] mb-12">
          Upcoming Sessions
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
                      Workshop
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold text-white uppercase tracking-wider"
                    >
                      City
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
                        {session.workshop}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-[#6E2D79]">
                        {session.city}
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
                          onClick={() => handleEnroll(session.workshop)}
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
            <FamilySessionForm />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default UpcomingSessions;
