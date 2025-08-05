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
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
    try {
      const response = await resolveIssue(issue.id);
      setMessage("Issue has been resolved successfully");
      fetchUnResolvedIssues();
      return response;
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
      <div className="flex items-center justify-center min-h-screen md:ml-150">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-black mb-6 border-b-2 border-orange-300 pb-2">
          Unresolved Issues
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Reported By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Issue Details
                  </th>
                     <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
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
                            {officeName}
                          </span>
                          {officeLocation && (
                            <span className="text-xs text-gray-500">
                              {officeLocation}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Service */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-gray-900">{serviceName}</span>
                          {serviceDesc && (
                            <span className="text-xs text-gray-500 truncate max-w-xs">
                              {serviceDesc}
                            </span>
                          )}
                        </div>
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

                      {/* Issue Details */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {issue.type || "No type specified"}
                          </span>
                          <span className="text-sm text-gray-600">
                            {issue.description || "No description"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Unresolved
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleResolveIssue(issue)}
                          className="px-3 py-1 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
                        >
                          Resolve
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {unResolvedIssuesList.length === 0 && !loadingData && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No unresolved issues found</p>
          </div>
        )}
      </div>

      {openModal && (
        <Modal>
          <NotificationModal
            error={error}
            handleSubmit={handleSubmit}
            title={error ? "Error" : "Success"}
            mesg={message}
          />
        </Modal>
      )}
    </div>
  );
}
