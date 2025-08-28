
import { useContext, useState } from "react";
import { unResolveIssue, addComment, deleteIssue } from "../../util/http";
import { IssueContext } from "../../store/issue-context";
import Issues from "../Issues";

export default function UserResolvedIssues() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [activeCommentIssue, setActiveCommentIssue] = useState(null);
  const [searching, setSearching] = useState(false)

  const { fetchResolvedIssues, resolvedIssuesList, fetchResolvedIssuesByDate } = useContext(IssueContext);

  async function handleUnResolveIssue(issue) {
    try {
      const response = await unResolveIssue(issue.id);
      setMessage("Issue has been marked as unresolved successfully");
      fetchResolvedIssues();
      setOpenModal(true);
      return response;
    } catch (err) {
      setError(err.message || "Failed to unresolve issue");
      setOpenModal(true);
    }
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

  const handleChangeComment = (e) => {
    setCommentText(e.target.value);
  };
  const handleCommentStatus = (id) => {
    setActiveCommentIssue(activeCommentIssue === id ? null : id);
  };

  const handleSubmitModal = () => {
    setOpenModal(false);
  };

  async function handleDeleteAdminResolved(issue) {
    try {
      const successMessage = await deleteIssue(issue.id);
      setMessage(successMessage.message);
      fetchResolvedIssues();
    } catch (err) {
      setError(err.message || "Failed to delete issue");
    }
    setOpenModal(true);
  }

  async function handleSubmitDate(e) {
    e.preventDefault();
    setSearching(true)
    await fetchResolvedIssuesByDate();
    setSearching(false) 
  }

  return (
    <>
      <Issues
        handleIssue={handleUnResolveIssue}
        openModal={openModal}
        message={message}
        error={error}
        issuesList={resolvedIssuesList}
        handleAddComment={handleAddComment}
        commentLoading={commentLoading}
        activeCommentIssue={activeCommentIssue}
        handleCommentStatus={handleCommentStatus}
        handleChangeComment={handleChangeComment}
        handleSubmitModal ={handleSubmitModal}
        handleDeleteIssue={handleDeleteAdminResolved}
        fetchIssues={fetchResolvedIssues}
        handleSubmitDate={handleSubmitDate}
        commentText={commentText}
        searching={searching}
        issueTitle="Resolved Issues"
        noIssueContent="No resolved issues found"
      />
    </>
  );
}