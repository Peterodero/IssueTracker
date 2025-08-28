import { useContext, useEffect, useState } from "react";
import { IssueContext } from "../../store/issue-context";
import LoadingIndicator from "../UI/LoadingIndicator";
import SearchByDate from "../SearchByDate";
import { authFetch, url } from "../../util/http";
import DeleteConfirmation from "../DeleteConfirmation";

export default function ViewTopUp() {
  const [loadingData, setLoadingData] = useState(false);
  const [searching, setSearching] = useState(false);
  const { fetchTopUps, fetchTopUpByDate, topUpList } = useContext(IssueContext);
  const [message, setMessage] = useState("")
  const [errMessage, setErrMessage] = useState("")

  const [isDeleting, setIsDeleting] = useState(false);
  const [topUpToDelete, setTopUpToDelete] = useState("");

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
      <div className="flex items-center justify-center h-screen w-screen fixed top-30 left-0">
        <LoadingIndicator />
      </div>
    );
  }

  async function handleSubmitDate(e) {
    e.preventDefault();
    setSearching(true);
    await fetchTopUpByDate();
    setSearching(false);
  }

  async function handleDeleteTopUp(id) {
    const response = await authFetch(url + "/data-bundles/delete/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    if (!response.ok) {
      const error = await response.json();
      setErrMessage("Failed to delete the record")
      throw new Error(error.message || "Failed to delete top-up");
    }

    const resData = await response.json();

    setMessage(resData?.message)
    setLoadingData(true);
    setIsDeleting(false)
    await fetchTopUps();
    setLoadingData(false);
    return resData;
  }

  function openDeleteModal(id) {
    setTopUpToDelete(id);
    setIsDeleting(true);
  }
  function closeDeleteModal() {
    setIsDeleting(false);
    setTopUpToDelete("");
  }

    let content;

  if (errMessage) {
    content = (
      <div className="mb-4 p-2 rounded-md bg-red-50 text-red-800 border border-red-200">
        {errMessage}
      </div>
    );
  }
  if (message) {
    content = (
      <div className="mb-4 p-2 rounded-md bg-green-100 text-green-800 border border-green-200">
        {message}
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl text-center font-bold text-black mb-6 border-b-2 border-orange-300 pb-2">
          Top-Up Records
        </h2>

        <SearchByDate handleSubmit={handleSubmitDate} searching={searching} />

        {/* Top-Ups Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-orange-300">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Sacco
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
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topUpList.map((list, index) => {
                  const saccoName = list.sacco?.name || "No sacoo assigned";
                  const officeName = list.office?.name || "No office assigned";
                  const amount = list.amount ? list.amount : "-";
                  const reporterName = list.created_by?.username || "Unknown";
                  const reporterPhone = list.created_by?.phone_number || "";
                  const simNumber = list.sim_number || "-";
                  const date = list.purchase_date || "-";

                  return (
                    <tr
                      key={list.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
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
                          <span className="font-medium text-gray-900">
                            {saccoName}
                          </span>
                        </div>
                      </td>

                      <td className="px-2 py-4">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">
                            {officeName}
                          </span>
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => openDeleteModal(list.id)}
                          className="px-4 py-1 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {isDeleting && (
          <DeleteConfirmation
            handleDelete={() => handleDeleteTopUp(topUpToDelete)}
            text="Are you sure you want to delete the record?"
            content={content}
            closeDeleteModal={closeDeleteModal}
          />
        )}

        {topUpList.length === 0 && !loadingData && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No top-up records found</p>
          </div>
        )}
      </div>
    </div>
  );
}
