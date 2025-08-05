import { useContext, useEffect, useState } from "react";
import { IssueContext } from "../../store/issue-context";
import LoadingIndicator from "../UI/LoadingIndicator";

export default function ViewTopUp() {
  const [loadingData, setLoadingData] = useState(false);
  const { fetchTopUps, topUpList } = useContext(IssueContext);

  useEffect(() => {
    const loadData = async () => {
      setLoadingData(true);
      try {
        await fetchTopUps();
      } catch (error) {
        console.error("Error loading top-ups:", error);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [fetchTopUps]);

  if (loadingData) {
    return (
      <div className="flex items-center justify-center md:ml-150">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-black mb-6 border-b-2 border-orange-300 pb-2">
          Top-Up Records
        </h2>

        {/* Top-Ups Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden md:w-4xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-orange-300">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Office
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Amount(Kshs)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    SIM Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topUpList.map((list, index) => {
                  const officeName = list.office?.name || "No office assigned";
                  const officeLocation = list.office?.location || "";
                  const amount = list.amount ? list.amount : "-";
                  const reporterName = list.created_by?.username || "Unknown";
                  const reporterPhone = list.created_by?.phone_number || "";
                  const simNumber = list.sim_number || "-";
                  const date = list.purchase_date || "-";

                  return (
                    <tr key={list.id} className="hover:bg-gray-50 transition-colors">
                      {/* Index Number */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                            index % 2 === 0
                              ? "bg-orange-100 text-orange-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {index + 1}
                        </span>
                      </td>

                      {/* Office */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{officeName}</span>
                          {officeLocation && (
                            <span className="text-xs text-gray-500">
                              {officeLocation}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900">
                          {amount}
                        </span>
                      </td>

                      {/* Reporter */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-gray-900">{reporterName}</span>
                          {reporterPhone && (
                            <span className="text-xs text-gray-500">
                              {reporterPhone}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* SIM Number */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900">{simNumber}</span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900">{date}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {topUpList.length === 0 && !loadingData && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No top-up records found</p>
          </div>
        )}
      </div>
    </div>
  );
}