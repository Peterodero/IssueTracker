import { useContext, useEffect, useState } from "react";
import { IssueContext } from "../../store/issue-context";
import LoadingIndicator from "../UI/LoadingIndicator";
import { unResolveIssue, addComment } from "../../util/http"; // Add addComment import
import Modal from "../UI/Modal";
import NotificationModal from "../issues/NotificationModal";
import { useNavigate, Link } from "react-router-dom";

export default function ResolvedIssues() {
  const [loadingData, setLoadingData] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [activeCommentIssue, setActiveCommentIssue] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
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
      <div className="flex items-center justify-center h-screen w-screen fixed top-30 left-0">
        <LoadingIndicator />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenModal(false);
    navigate(1);
  };

  async function handleUnResolveIssue(issue) {
    try {
      const response = await unResolveIssue(issue.id);
      setMessage("Issue has been marked as unresolved successfully");
      fetchResolvedIssues();
      return response;
    } catch (err) {
      setError(err.message || "Failed to unresolve issue");
    }
    setOpenModal(true);
  }

  const handleAddComment = async (issueId) => {
    if (!commentText.trim()) return;

    try {
      setCommentLoading(true);
      await addComment(issueId, commentText);
      setCommentText("");
      setActiveCommentIssue(null);
      setMessage("Comment added successfully");
      setOpenModal(true);
    } catch (err) {
      setError(err.message || "Failed to add comment");
      setOpenModal(true);
    } finally {
      setCommentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto">
        <h2 className="text-2xl text-center font-bold text-black mb-6 border-b-2 border-orange-300 pb-2">
          Resolved Issues
        </h2>

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
                    Issue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {resolvedIssuesList.map((issue, index) => {
                  const officeName = issue.office?.name || "No office assigned";
                  const officeLocation = issue.office?.location || "";
                  const serviceName =
                    issue.service?.name || "No service specified";
                  const serviceDesc = issue.service?.description || "";
                  const reporterName = issue.reporter?.username || "Unknown";
                  const reporterPhone = issue.reporter?.phone_number || "";

                  return (
                    <>
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

                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Resolved
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            to={`/landing/view-attachment/${issue.id}`}
                            className="text-orange-500 hover:text-orange-700 font-medium"
                          >
                            View Details
                          </Link>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                          <button
                            onClick={() => setActiveCommentIssue(activeCommentIssue === issue.id ? null : issue.id)}
                            className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-400 transition-colors"
                          >
                            {activeCommentIssue === issue.id ? "Cancel" : "Comment"}
                          </button>
                          <button
                            onClick={() => handleUnResolveIssue(issue)}
                            className="px-3 py-1 bg-orange-100 text-orange-800 rounded-md text-sm font-medium hover:bg-orange-200 transition-colors"
                          >
                            Unresolve
                          </button>
                        </td>
                      </tr>

                      {/* Comment Input Row */}
                      {activeCommentIssue === issue.id && (
                        <tr className="bg-gray-50">
                          <td colSpan="8" className="px-6 py-4">
                            <div className="flex items-start gap-4">
                              <div className="flex-1">
                                <textarea
                                  value={commentText}
                                  onChange={(e) => setCommentText(e.target.value)}
                                  placeholder="Add a comment..."
                                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
                                  rows={3}
                                  disabled={commentLoading}
                                />
                              </div>
                              <button
                                onClick={() => handleAddComment(issue.id)}
                                disabled={!commentText.trim() || commentLoading}
                                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-600 disabled:bg-orange-300 transition-colors"
                              >
                                {commentLoading ? "Posting..." : "Post Comment"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {resolvedIssuesList.length === 0 && !loadingData && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No resolved issues found</p>
          </div>
        )}
      </div>

      {openModal && (
        <Modal>
          <NotificationModal
            handleSubmit={handleSubmit}
            error={error}
            title={error ? "Error" : "Success"}
            mesg={message}
          />
        </Modal>
      )}
    </div>
  );
}