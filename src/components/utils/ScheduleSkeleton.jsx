import React from "react";

const ScheduleSkeleton = ({ rows = 8 }) => {
  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200px 100%;
          animation: shimmer 1.5s infinite;
        }

        .skeleton-text {
          height: 16px;
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .skeleton-title {
          height: 20px;
          border-radius: 4px;
          margin-bottom: 4px;
        }

        .skeleton-button {
          height: 32px;
          width: 80px;
          border-radius: 6px;
        }

        .skeleton-badge {
          height: 24px;
          width: 60px;
          border-radius: 12px;
        }
      `}</style>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
              {Array.from({ length: rows }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-4 py-4">
                    <div className="flex flex-col max-w-[250px]">
                      <div className="skeleton skeleton-title mb-2"></div>
                      <div className="skeleton skeleton-text w-3/4"></div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="skeleton skeleton-text w-20"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="skeleton skeleton-text w-24"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="skeleton skeleton-text w-28"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="skeleton skeleton-badge"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="skeleton skeleton-badge"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="skeleton skeleton-button"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ScheduleSkeleton;
