import { useParams, useNavigate , useLocation} from "react-router-dom";
import ErrorBlock from "../UI/ErrorBlock";
import { formatDate } from "../../util/date";
import { DocumentIcon, ArrowDownTrayIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function SaccoDetails() {
  const saccoId = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { sacco } = location.state || {}; // Get the passed object
//   const [issue, setIssue] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

console.log(sacco)

  if (!sacco) {
    return <ErrorBlock message="Issue not found" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>
        <h2 className="text-lg font-bold text-gray-900">Sacco Details</h2>
        <div className="w-24"></div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Basic Information
              </h3>
              <DetailItem
                label="Date Reported"
                value={formatDate(sacco.created_at)}
              />
              {/* <DetailItem label="Status" value={issue.status} badge /> */}
              {/* <DetailItem label="Issue Type" value={issue.type} /> */}
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Description
              </h3>
              {/* <p className="text-gray-700 whitespace-pre-line">
                {issue.description}
              </p> */}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Related Entities
              </h3>
              {/* <DetailItem
                label="Office"
                value={issue.office?.name}
                subValue={issue.office?.location}
              />
              <DetailItem
                label="Service"
                value={issue.service?.name}
                subValue={issue.service?.description}
              />
              <DetailItem
                label="Reported By"
                value={issue.reporter?.username}
                subValue={issue.reporter?.phone_number}
              /> */}
            </div>
          </div>
        </div>

     

      
      </div>
    </div>
  );
}

function DetailItem({ label, value, subValue, badge = false }) {
  return (
    <div className="mb-4 last:mb-0">
      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
        {label}
      </h4>
      {badge ? (
        <span
          className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
            value === "resolved"
              ? "bg-green-100 text-green-800"
              : "bg-orange-100 text-orange-800"
          }`}
        >
          {value}
        </span>
      ) : (
        <p className="text-gray-900 font-medium mt-1">{value || "-"}</p>
      )}
      {subValue && <p className="text-sm text-gray-500 mt-1">{subValue}</p>}
    </div>
  );
}

function AttachmentPreview({ url, fileName }) {
  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

  const handlePreview = (e) => {
    if (isImage) {
      e.preventDefault();
      window.open(url, '_blank');
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
      <div className="h-48 flex items-center justify-center bg-gray-50 relative overflow-hidden">
        {isImage ? (
          <a 
            href={url} 
            onClick={handlePreview}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full flex items-center justify-center cursor-pointer"
          >
            <img
              src={url}
              alt="Attachment preview"
              className="object-contain w-full h-full p-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-image.png";
              }}
            />
          </a>
        ) : (
          <div className="p-4 text-center">
            <DocumentIcon className="h-12 w-12 mx-auto text-gray-400" />
            <span className="text-gray-500 mt-2 block truncate px-2">
              {fileName}
            </span>
          </div>
        )}
      </div>
      <div className="p-3 border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm text-gray-500 truncate">{fileName}</span>
        <div className="flex gap-2">
          {isImage && (
            <a
              href={url}
              onClick={handlePreview}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-800 text-sm font-medium flex items-center gap-1 px-3 py-1 rounded hover:bg-orange-50 transition-colors"
              title="Preview"
            >
              <EyeIcon className="h-4 w-4" />
            </a>
          )}
          <a
            href={url}
            download
            className="text-orange-600 hover:text-orange-800 text-sm font-medium flex items-center gap-1 px-3 py-1 rounded hover:bg-orange-50 transition-colors"
            title="Download"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
