import { useContext, useEffect, useState } from "react";
import { IssueContext } from "../../store/issue-context";
import LoadingIndicator from "../UI/LoadingIndicator";

export default function ViewTopUp() {

      const [loadingData, setLoadingData] = useState(false);
    //   const [error, setError] = useState(null);
    
      const { fetchTopUps, topUpList } = useContext((IssueContext));
    
      useEffect(() => {
        const loadData = async () => {
          setLoadingData(true);
          try {
            await fetchTopUps();
          } catch (error) {
            console.error("Error loading issues:", error);
          } finally {
            setLoadingData(false);
          }
        };
    
        loadData();
      }, [fetchTopUps]);
    
      if (loadingData) {
        return (
          <div className="md:ml-100">
            <LoadingIndicator />
          </div>
        );
      }

  return (
    <div className=" max-w-5xl md:w-4xl mx-auto overflow-scroll  md:ml-10 p-4">
      <div className=" rounded-lg ">
        <table className="w-full ">
          <thead>
            <tr className="border-b border-gray-200 bg-blue-200">
              <th className="py-5 px-4 text-left text-sm font-semibold text-gray-700">
                #
              </th>
              <th className="py-5 px-4 text-left text-sm font-semibold text-gray-700">
                Office
              </th>
              <th className="py-5 px-4 text-left text-sm font-semibold text-gray-700 sm:table-cell">
                Amount
              </th>
              <th className="py-5 px-4 text-left text-sm font-semibold text-gray-700">
                By
              </th>
              <th className="py-5 px-4 text-left text-sm font-semibold text-gray-700 sm:table-cell">
                Sim Number
              </th>
              <th className="py-5 px-4 text-left text-sm font-semibold text-gray-700 sm:table-cell">
                Date
              </th>
             
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {topUpList.map((list, index) => {
              const officeName = list.office?.name || "No office assigned";
              const officeLocation = list.office?.location || "";
              const amount = list.amount || "";
              const reporterName = list.created_by?.username || "Unknown";
              const reporterPhone = list.created_by?.phone_number || "";
              const sim_number = list.sim_number|| "";
               const date = list.purchase_date|| "";

              return (
                <tr
                  key={list.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Index Number */}
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                        index % 2 === 0
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </td>

                  {/* Office */}
                  <td className="py-4 px-4 text-sm text-gray-700">
                    <div className="flex flex-col">
                      <span className="font-semibold">{officeName}</span>
                      {officeLocation && (
                        <span className="text-xs text-gray-500">
                          {officeLocation}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* amount */}
                  <td className="py-4 px-4 text-sm text-gray-700 sm:table-cell">
                    <div className="flex flex-col">
                      <span>{amount}</span>
                    </div>
                  </td>

                  {/* Reporter */}
                  <td className="py-4 px-4 text-sm text-gray-700">
                    <div className="flex flex-col">
                      <span>{reporterName}</span>
                      {reporterPhone && (
                        <span className="text-xs text-gray-500">
                          {reporterPhone}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-sm text-gray-700 sm:table-cell">
                    <div className="flex flex-col">
                      <span>{sim_number}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-sm text-gray-700 sm:table-cell">
                    <div className="flex flex-col">
                      <span>{date}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
