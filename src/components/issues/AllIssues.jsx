import { useContext, useState } from "react";
import { IssueContext } from "../../store/issue-context";
import { addComment, deleteIssue } from "../../util/http";
import Issues from "../Issues";



export default function AllIssues() {

  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [activeCommentIssue, setActiveCommentIssue] = useState(null);
  const [searching, setSearching] = useState(false)

  const { fetchIssues, issuesList, fetchResolvedIssuesByDate, fetchResolvedIssues } = useContext(IssueContext);

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
           openModal={openModal}
           message={message}
           error={error}
           issuesList={issuesList}
           handleAddComment={handleAddComment}
           commentLoading={commentLoading}
           activeCommentIssue={activeCommentIssue}
           handleCommentStatus={handleCommentStatus}
           handleChangeComment={handleChangeComment}
           handleSubmitModal={handleSubmitModal}
           handleDeleteIssue={handleDeleteAdminResolved}
           handleSubmitDate={handleSubmitDate}
           fetchIssues={fetchIssues}
           commentText={commentText}
           searching={searching}
           role="admin"
           type="all"
           issueTitle="All Issues"
           issueStatus="unresolved"
           issueAction="Resolve"
           noIssueContent="No issues found"
         />
       </>
  );
}