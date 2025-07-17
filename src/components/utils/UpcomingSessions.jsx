import { useEffect, useState } from "react";
import React from "react";
import FamilySessionForm from "./FamilySessionForm";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
const UpcomingSessions = ({ id, modal }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const navigate = useNavigate();

  const sessions = [
    {
      id: 8,
      Event: "Family Constellation",
      Date: "Aug 9, 2025",
      Location: "Cold Spring, TX",
      capacity: "10 Seats",
      organisedby: "Dr Aiyasawmy",
      organiserEmail: "Aiyasawmy@gmail.com",
      // price: "$ 375",
      status: "Open",
    },
    {
      id: 1,
      Event: "Family Constellation",
      Date: "Aug 12, 2025",
      Location: "Houston",
      capacity: "10 Seats",
      organisedby: "Dr Aiyasawmy",
      organiserEmail: "Aiyasawmy@gmail.com",
      status: "Open",
    },
    {
      id: 2,
      Event: "Family Constellation",
      Date: "Aug 18, 2025",
      Location: "Houston",
      capacity: "10 Seats",
      organisedby: "Dr Aiyasawmy",
      organiserEmail: "Aiyasawmy@gmail.com",
      status: "Open",
    },
    {
      id: 3,
      Event: "Family Constellation",
      Date: "Aug 22, 2025",
      Location: "Austin",
      capacity: "10 Seats",
      organisedby: "Dr Manoj",
      organiserEmail: "docbhardwaj@gmail.com",
      status: "Open",
    },
    {
      id: 4,
      Event: "Family Constellation",
      Date: "Aug 23, 2025",
      Location: "Austin",
      capacity: "10 Seats",
      organisedby: "Dr Manoj",
      organiserEmail: "docbhardwaj@gmail.com",
      status: "Open",
    },

    {
      id: 6,
      Event: "Family Constellation",
      Date: "Aug 28, 2025",
      Location: "Woodlands",
      capacity: "10 Seats",
      organisedby: "Dr Manoj",
      organiserEmail: "docbhardwaj@gmail.com",
      status: "Open",
    },
    {
      id: 9,
      Event: "Family Constellation",
      Date: "Aug 29, 2025",
      Location: "Woodlands",
      capacity: "10 Seats",
      organisedby: "Dr Manoj's",
      organiserEmail: "docbhardwaj@gmail.com",
      status: "Open",
    },
    {
      id: 7,
      Event: "Family Constellation",
      Date: "Sept 7, 2025",
      Location: "San Diego",
      capacity: "6 Seats",
      organisedby: "Dr Sonia Gupte's",
      organiserEmail: "Sonia@enso-nia.com",
      status: "Open",
    },
  ];

  useEffect(() => {
    if (id && modal === "true") {
      const matchingSession = sessions.find(
        (session) => session.id.toString() === id.toString()
      );
      if (matchingSession) {
        setSelectedSession(matchingSession);
        setSelectedWorkshop(matchingSession);
        setShowModal(true);
      }
    }
  }, [id, modal]);

  const handleEnroll = (session) => {
    setSelectedWorkshop(session);
    setSelectedSession(session);
    setShowModal(true);
    // Update URL when opening modal
    navigate(`?id=${session.id}&modal=true`, { replace: true });
  };

  const handleCloseModal = () => {
    setShowModal(false);

    if (modal === "true") {
      navigate("/schedule");
    }
  };

  return (
    <div className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[1.5rem] font-medium text-center text-[#6E2D79] mb-12">
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
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold text-white uppercase tracking-wider"
                    >
                      Event
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold text-white uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold text-white uppercase tracking-wider"
                    >
                      No of Seats
                    </th>
                    {/* <th
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold text-white uppercase tracking-wider"
                    >
                      Organised by
                    </th> */}
                    {/* 
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-base font-semibold text-white uppercase tracking-wider"
                    ></th> */}
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
                        {session.Date}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-base text-[#6E2D79]">
                        {session.Event}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-[#6E2D79]">
                        {session.Location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-[#6E2D79]">
                        {session.capacity}
                      </td>
                      {/* 
                    
                      <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-[#6E2D79]">
                        {session.organisedby}
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
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-base">
                        <button
                          onClick={() => handleEnroll(session)}
                          className="px-4 py-2 bg-[#6E2D79] text-white rounded-lg hover:bg-[#8a3c97] transition-colors shadow-sm text-base cursor-pointer"
                        >
                          Enroll Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-center">
                <p className="text-sm text-[#6E2D79] italic">
                  * Seats are allocated on a first come first serve basis
                </p>
              </div>
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={handleCloseModal} // Close when clicking backdrop
          style={{ zIndex: "9999999" }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden max-h-[90vh] flex flex-col z-[10000]"
            onClick={(e) => e.stopPropagation()}
          >
            <FamilySessionForm
              onClose={handleCloseModal}
              selectedSession={selectedSession}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default UpcomingSessions;
