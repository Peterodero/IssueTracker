import { useEffect, useState } from "react";
import LoadingIndicator from "./UI/LoadingIndicator";
import Modal from "./UI/Modal";
import { Link } from "react-router-dom";
import { IssueContext } from "../store/issue-context";
import NotificationModal from "./issues/NotificationModal";
import IssuesTable from "./IssuesTable";

export default function Issues({
  handleIssue,
  message,
  searching,
  error,
  role,
  issuesList,
  handleAddComment,
  activeCommentIssue,
  handleChangeComment,
  fetchIssues,
  commentText,
  commentLoading,
  noIssueContent,
  issueTitle,
  handleCommentStatus,
  handleDeleteIssue,
  handleSubmitModal,
  handleSubmitDate,
}) {
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoadingData(true);
      try {
        await fetchIssues();
      } catch (error) {
        console.error("Error loading issues:", error);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [fetchIssues]);

  if (loadingData) {
    return (
      <div className="flex items-center justify-center h-screen w-screen fixed top-30 left-0">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <IssuesTable
        role={role}
        handleIssue={handleIssue}
        loadingData={loadingData}
        issuesList={issuesList}
        handleAddComment={handleAddComment}
        activeCommentIssue={activeCommentIssue}
        handleChangeComment={handleChangeComment}
        commentText={commentText}
        commentLoading={commentLoading}
        noIssueContent={noIssueContent}
        issueTitle={issueTitle}
        handleCommentStatus={handleCommentStatus}
        handleDeleteIssue={handleDeleteIssue}
        handleSubmitDate={handleSubmitDate}
        searching={searching}
        error={error}
        title={error ? "Error" : "Success"}
        mesg={message}
        handleSubmit={handleSubmitModal}
      />

      {/* {openModal && (
        <Modal>
          <NotificationModal
            error={error}
            title={error ? "Error" : "Success"}
            mesg={message}
            handleSubmit={handleSubmitModal}
          />
        </Modal>
      )} */}
    </div>
  );
}
