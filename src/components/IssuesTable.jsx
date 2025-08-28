import { Link } from "react-router-dom";
import SearchByDate from "./SearchByDate";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import Modal from "./UI/Modal";
import DeleteConfirmation from "./DeleteConfirmation";

export default function IssuesTable({
  handleIssue,
  issuesList,
  handleAddComment,
  activeCommentIssue,
  handleChangeComment,
  commentText,
  commentLoading,
  noIssueContent,
  issueTitle,
  loadingData,
  handleCommentStatus,
  handleDeleteIssue,
  handleSubmitDate,
  searching,
  // error,
  // mesg,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [issueToDelete, setIssueToDelete] = useState({});

  function openDeleteModal(issue) {
    setIssueToDelete(issue);
    setIsDeleting(true);
  }
  function closeDeleteModal() {
    setIsDeleting(false);
    setIssueToDelete({});
  }

  // let content;

  // if (error) {
  //   content = (
  //     <div className="mb-4 p-2 rounded-md bg-red-50 text-red-800 border border-red-200">
  //       {error}
  //     </div>
  //   );
  // }
  // if (mesg) {
  //   content = (
  //     <div className="mb-4 p-2 rounded-md bg-green-100 text-green-800 border border-green-200">
  //       {mesg}
  //     </div>
  //   );
  // }

  const role = sessionStorage.getItem("role");

  return (
    <div className="mx-auto">
      <h2 className="text-2xl text-center font-bold text-black mb-6 border-b-2 border-orange-300 pb-2">
        {issueTitle}
      </h2>

      <SearchByDate handleSubmit={handleSubmitDate} searching={searching} />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-orange-300">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Sacco
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Office
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Service
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Issue
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Reported By
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Details
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {issuesList.map((issue, index) => {
                console.log(issue)
                const saccoName = issue.sacco?.name || "No sacco assigned";
                const officeName = issue.office?.name || "No sacco assigned";
                const serviceName =
                  issue.service?.name || "No service specified";
                const reporterName = issue.reporter?.username || "Unknown";
                const reporterPhone = issue.reporter?.phone_number || "No number specified";
                const assigned_to =
                  issue.assigned_to?.username || "No user specified";

                const status = issue.status;

                let statusContent, statusStyle, issueStatusStyle, statusAction;

                if (status === "unsolved") {
                  statusContent = "Unresolved";
                  statusAction = "Resolve";
                  statusStyle = "bg-orange-100 text-orange-800";
                  issueStatusStyle = "bg-green-100 text-green-800";
                }
                if (status === "solved") {
                  statusContent = "Resolved";
                  statusAction = "Unresolve";
                  statusStyle = "bg-green-100 text-green-800";
                  issueStatusStyle = "bg-orange-100 text-orange-800";
                }

                return (
                  <Fragment key={issue.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      {/* Index Number */}
                      <td className="px-2 py-4 whitespace-nowrap">
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
                      <td className="px-2 py-4 whitespace-nowrap">
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

                      {/* Service */}
                      <td className="px-2 py-4">
                        <div className="flex flex-col">
                          <span className="text-gray-900">{serviceName}</span>
                        </div>
                      </td>

                      {/* Issue Details */}
                      <td className="px-2 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {issue.type || "No type specified"}
                          </span>
                        </div>
                      </td>

                      {/* Reporter */}
                      <td className="px-2 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-gray-900">{reporterName}</span>
                          {reporterPhone && (
                            <span className="text-xs text-gray-500">
                              {reporterPhone}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-2 py-4">
                        <div className="flex flex-col">
                          <span className="font-small text-gray-500">
                            {assigned_to}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-2 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyle}`}
                        >
                          {statusContent}
                        </span>
                      </td>

                      <td className="px-2 py-4 whitespace-nowrap">
                        <Link
                          to={
                            role === "admin"
                              ? `/admin/view-attachment/${issue.id}`
                              : `/landing/view-attachment/${issue.id}`
                          }
                          className="text-orange-500 hover:text-orange-700 font-medium"
                        >
                          View Details
                        </Link>
                      </td>

                      {/* Actions */}
                      <td className="px-2 py-4 whitespace-nowrap space-x-2">
                        {role === "admin" && (
                          <button
                            onClick={() => openDeleteModal(issue)}
                            className="px-1 py-1 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          >
                            Delete
                          </button>
                        )}
                        <button
                          onClick={() => handleCommentStatus(issue.id)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-400 transition-colors"
                        >
                          {activeCommentIssue === issue.id
                            ? "Cancel"
                            : "Comment"}
                        </button>
                        <button
                          onClick={() => handleIssue(issue)}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${issueStatusStyle} transition-colors`}
                        >
                          {statusAction}
                        </button>
                      </td>
                    </tr>

                    {/* Comment Input Row */}
                    {activeCommentIssue === issue.id && (
                      <tr className="">
                        <td colSpan="8" className="px-6 py-4">
                          <div className="flex items-center gap-6">
                            <div className="flex-1">
                              <textarea
                                value={commentText}
                                onChange={handleChangeComment}
                                placeholder="Add a comment..."
                                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
                                rows={3}
                                disabled={commentLoading}
                              />
                            </div>
                            <button
                              onClick={() => handleAddComment(issue.id)}
                              disabled={!commentText.trim() || commentLoading}
                              className="px-3 flex flex-row py-3 bg-orange-600 text-white rounded-md hover:bg-orange-600 disabled:bg-orange-300 transition-colors"
                            >
                              <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                              {commentLoading ? "Posting..." : "Post Comment"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isDeleting && (
        <DeleteConfirmation
          handleDelete={() => {
             handleDeleteIssue(issueToDelete)
             setIsDeleting(false)
             }}
          text="Are you sure you want to delete the issue?"
          // content={content}
          closeDeleteModal={closeDeleteModal}
        />
      )}

      {issuesList.length === 0 && !loadingData && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">{noIssueContent}</p>
        </div>
      )}
    </div>
  );
}
