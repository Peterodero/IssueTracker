import { useContext, useEffect, useState } from "react";
import { IssueContext } from "../../store/issue-context";
import Modal from "../UI/Modal";
import LoadingIndicator from "../UI/LoadingIndicator";
import { deleteIssue, resolveIssue } from "../../util/http";
import NotificationModal from "../issues/NotificationModal";
import { Link, useNavigate } from "react-router-dom";
import SearchByDate from "../SearchByDate";

export default function AdminUnresolvedIssues() {
  const {
    fetchUnResolvedIssues,
    fetchUnresolvedIssuesByDate,
    unResolvedIssuesList,
  } = useContext(IssueContext);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

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
      const successMessage = await resolveIssue(issue.id);
      setMessage(successMessage.message);
      fetchUnResolvedIssues();
    } catch (err) {
      setError(err.message || "Failed to resolve issue");
    }
    setOpenModal(true);
  }

  async function handleDeleteIssue(issue) {
    try {
      const successMessage = await deleteIssue(issue.id);
      setMessage(successMessage.message);
      fetchUnResolvedIssues();
    } catch (err) {
      setError(err.message || "Failed to delete issue");
    }
    setOpenModal(true);
    console.log(message);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenModal(false);
    navigate("/admin/admin_unresolved");
  };

  async function handleSubmitDate(e) {
    e.preventDefault();
    await fetchUnresolvedIssuesByDate();
  }

  if (loadingData) {
    return (
      <div className="flex items-center justify-center h-screen w-screen fixed top-30 left-0">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl text-center font-bold text-black mb-6 border-b-2 border-orange-300 pb-2">
          Unresolved Issues
        </h2>

        <SearchByDate handleSubmit={handleSubmitDate} />

        {/* Issues Table */}
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
                    By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Issue Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Details
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900">
                          {issue.type || "No type specified"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Unresolved
                        </span>
                      </td>

                      {/* Details */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/admin/view-attachment/${issue.id}`}
                          className="text-orange-500 hover:text-orange-700 font-medium"
                        >
                          View Details
                        </Link>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDeleteIssue(issue)}
                            className="px-3 py-1 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleResolveIssue(issue)}
                            className="px-3 py-1 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-orange-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
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
            title={error ? "Error" : "Success!"}
            mesg={message}
          />
        </Modal>
      )}
    </div>
  );
}
