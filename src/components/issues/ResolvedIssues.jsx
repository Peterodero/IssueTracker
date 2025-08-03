import { useContext, useEffect, useState } from "react";
import { IssueContext } from "../../store/issue-context";
import LoadingIndicator from "../UI/LoadingIndicator";
import { unResolveIssue } from "../../util/http";
import Modal from "../UI/Modal";
import NotificationModal from "./NotificationModal";
import { useNavigate } from "react-router-dom";

export default function ResolvedIssues() {
  const [loadingData, setLoadingData] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { fetchResolvedIssues, resolvedIssuesList } = useContext(IssueContext);

  useEffect(() => {
    const loadData = async () => {
      setLoadingData(true);
      try {
        await fetchResolvedIssues();
      } catch (error) {
        console.error("Error loading issues:", error);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [fetchResolvedIssues]);

  if (loadingData) {
    return (
      <div className="md:ml-100">
        <LoadingIndicator />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenModal(false)
    navigate(1);
  };

  async function handleUnResolveIssue(issue) {
    console.log(issue);
    try {
      await unResolveIssue(issue.id);
      fetchResolvedIssues();
    } catch (err) {
      setError(err.message || "Failed to unresolve issue");
    }
    setOpenModal(true);
  }

  return (
    <>
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
                Service
              </th>
              <th className="py-5 px-4 text-left text-sm font-semibold text-gray-700">
                By
              </th>
              <th className="py-5 px-4 text-left text-sm font-semibold text-gray-700 sm:table-cell">
                Issue
              </th>
              <th className="py-5 px-4 text-left text-sm font-semibold text-gray-700 sm:table-cell">
                Status
              </th>
              <th className="py-5 px-4 text-left text-sm font-semibold text-gray-700 sm:table-cell">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {resolvedIssuesList.map((issue, index) => {
              const officeName = issue.office?.name || "No office assigned";
              const officeLocation = issue.office?.location || "";
              const serviceName = issue.service?.name || "No service specified";
              const serviceDesc = issue.service?.description || "";
              const status = issue.status || "";
              const reporterName = issue.reporter?.username || "Unknown";
              const reporterPhone = issue.reporter?.phone_number || "";

              return (
                <tr
                  key={issue.id}
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

                  {/* Service */}
                  <td className="py-4 px-4 text-sm text-gray-700 sm:table-cell">
                    <div className="flex flex-col">
                      <span>{serviceName}</span>
                      {serviceDesc && (
                        <span className="text-xs text-gray-500 truncate max-w-xs">
                          {serviceDesc}
                        </span>
                      )}
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

                  {/* Issue Details */}
                  <td className="py-4 px-4 text-sm text-gray-700 sm:table-cell">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">
                        {issue.type || "No type specified"}
                      </span>
                      <span className="text-gray-600">
                        {issue.description || "No description"}
                      </span>
                      {/* {issue.attachments && (
                        <span className="text-xs text-blue-500 mt-1">
                          Has attachments
                        </span>
                      )} */}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-sm text-gray-700 sm:table-cell">
                    <div className="flex flex-col">
                      <span>{status}</span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-4 text-sm text-gray-700 sm:table-cell">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUnResolveIssue(issue)}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium hover:bg-green-200"
                      >
                        Mark as unresolved
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
      {openModal && (
            <div className="flex items-center justify-center">
              <Modal>
                <NotificationModal handleSubmit={handleSubmit} error={error} title="Issue unresolved successfully"/>
              </Modal>
            </div>
          )}
    </>
  );
}
