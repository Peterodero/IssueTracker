import { useContext, useState } from "react";
import { addComment, deleteIssue, resolveIssue } from "../../util/http";
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

  const {
    fetchUnResolvedIssues,
    unResolvedIssuesList,
    fetchUnresolvedIssuesByDate,
  } = useContext(IssueContext);

  async function handleResolveIssue(issue) {
    try {
      const response = await resolveIssue(issue.id);
      setMessage("Issue has been marked as resolved successfully");
      fetchUnResolvedIssues();
      setOpenModal(true)
      return response;
    } catch (err) {
      setError(err.message || "Failed to resolve issue");
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

  async function handleDeleteAdminUnresolved(issue) {
    try {
      const successMessage = await deleteIssue(issue.id);
      setMessage(successMessage.message);
      fetchUnResolvedIssues();
    } catch (err) {
      setError(err.message || "Failed to delete issue");
    }
    setOpenModal(true);
  }

  async function handleSubmitDate(e) {
    e.preventDefault();
    setSearching(true)
    await fetchUnresolvedIssuesByDate();
    setSearching(false)
  }

  return (
    <>
      <Issues
        handleIssue={handleResolveIssue}
        openModal={openModal}
        message={message}
        error={error}
        issuesList={unResolvedIssuesList}
        handleAddComment={handleAddComment}
        commentLoading={commentLoading}
        activeCommentIssue={activeCommentIssue}
        handleCommentStatus={handleCommentStatus}
        handleChangeComment={handleChangeComment}
        handleSubmitModal={handleSubmitModal}
        handleDeleteIssue={handleDeleteAdminUnresolved}
        handleSubmitDate={handleSubmitDate}
        fetchIssues={fetchUnResolvedIssues}
        commentText={commentText}
        searching={searching}
        issueTitle="Unresolved Issues"
        noIssueContent="No unresolved issues found"
      />
    </>
  );
}
