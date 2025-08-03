import { useContext, useEffect, useState } from "react";
import { IssueContext } from "../../store/issue-context";
import Modal from "../UI/Modal";
import LoadingIndicator from "../UI/LoadingIndicator";
import { resolveIssue } from "../../util/http";
import NotificationModal from "./NotificationModal";
import { useNavigate } from "react-router-dom";

export default function UnresolvedIssues() {
  const { fetchUnResolvedIssues, unResolvedIssuesList } =
    useContext(IssueContext);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoadingData(true);
      try {
        await fetchUnResolvedIssues();
      } catch (error) {
        console.error("Error loading issues:", error);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [fetchUnResolvedIssues]);

  async function handleResolveIssue(issue) {
    console.log(issue);
    try {
      await resolveIssue(issue.id);
      fetchUnResolvedIssues();
    } catch (err) {
      setError(err.message || "Failed to resolve issue");
    }
    setOpenModal(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenModal(false);
    navigate(1);
  };

  if (loadingData) {
    return (
      <div className="md:ml-100 md:mt-10">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <>
      <div className=" max-w-5xl md:w-4xl mx-auto overflow-scroll  md:ml-8 p-4">
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {unResolvedIssuesList.map((issue, index) => {
                const officeName = issue.office?.name || "No office assigned";
                const officeLocation = issue.office?.location || "";
                const serviceName =
                  issue.service?.name || "No service specified";
                const serviceDesc = issue.service?.description || "";
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
                        {issue.attachments && (
                          <button
                            className="text-xs text-blue-500 mt-1 cursor-pointer hover:underline"
                            onClick={() =>
                              navigate("/landing/view-attachment", {
                                state: { attachmentUrl: issue.attachments },
                              })
                            }
                          >
                            Has attachments
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-sm text-gray-700 sm:table-cell">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleResolveIssue(issue)}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium hover:bg-green-200"
                        >
                          Resolve
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
        <div className="flex items-center justify-center ml-4">
          <Modal>
            <NotificationModal
              error={error}
              handleSubmit={handleSubmit}
              title="Issue resolved successfully"
            />
          </Modal>
        </div>
      )}
    </>
  );
}
