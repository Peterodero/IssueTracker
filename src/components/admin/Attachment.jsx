import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import { getIssueDetails } from "../../util/http";
import { formatDate } from "../../util/date";

export default function ViewAttachment() {
  const issueId  = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(issueId)

  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        const resData = await getIssueDetails(issueId);
        const data = resData[0]
        console.log(data)
        setIssue(data);
      } catch (err) {
        setError(err.message || "Failed to load issue details");
      } finally {
        setLoading(false);
      }
    };

    fetchIssueDetails();
  }, [issueId]);

  if (loading) {
    return(
     <div className="md:ml-100 md:mt-10">
        <LoadingIndicator />
      </div>
    )
  }

  if (error) {
    return <ErrorBlock message={error} onRetry={() => window.location.reload()} />;
  }

  if (!issue) {
    return <ErrorBlock message="Issue not found" />;
  }

  return (
    <div className="max-w-5xl md:w-4xl mx-auto overflow-scroll  md:ml-10 p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Issue Details</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
        >
          Back to Issues
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
        {/* Left Column - Basic Info */}
        <div className="space-y-4">
          <DetailItem label="Date Reported" value={formatDate(issue.created_at)} />
          <DetailItem label="Status" value={issue.status} badge />
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-semibold text-xl mb-2">Description</h4>
            <p className="text-gray-700">{issue.description}</p>
          </div>
        </div>

        {/* Right Column - Related Entities */}
        <div className="space-y-4">
          <DetailItem label="Issue Type" value={issue.type} />
          <DetailItem label="Office" value={issue.office?.name} subValue={issue.office?.location} />
          <DetailItem label="Service" value={issue.service?.name} subValue={issue.service?.description} />
          <DetailItem label="Reported By" value={issue.reporter?.username} subValue={issue.reporter?.phone_number} />
        </div>
      </div>

      {/* Attachment Section */}
      {issue.attachments.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Attachments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {issue.attachments.map((attachment, index) => (
              <AttachmentPreview key={index} url={attachment.file} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value, subValue, badge = false }) {
  return (
    <div>
      <h4 className="text-xl font-medium text-gray-500">{label}</h4>
      {badge ? (
        <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
          value === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      ) : (
        <p className="text-gray-900 font-medium p-2">{value}</p>
      )}
      {subValue && <p className="text-sm text-gray-500 mt-1">{subValue}</p>}
    </div>
  );
}

function AttachmentPreview({ url }) {
  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  
  return (
    <div className="border rounded-md overflow-hidden">
      {isImage ? (
        <img 
          src={url} 
          alt="Attachment" 
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder-image.png';
          }}
        />
      ) : (
        <div className="bg-gray-100 h-48 flex items-center justify-center">
          <span className="text-gray-500">File Attachment</span>
        </div>
      )}
      <div className="p-3 bg-gray-50">
        <a 
          href={url} 
          download
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Download
        </a>
      </div>
    </div>
  );
}