import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResolveIssueForm({handleCancelIssue}) {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const [resolution, setResolution] = useState({
    status: "resolved",
    resolutionDetails: "",
    timeSpent: "",
    attachments: [],
  });

  const currentIssue = {
    id: issueId,
    title: "Login failures on Mzigo platform",
    description: "Users unable to login since morning update",
    office: "Naekana",
    service: "Mzigo",
    reportedBy: "John Doe",
    reportedAt: "2023-06-15T09:30:00Z",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Resolving issue:", { issueId, resolution });

    navigate("/viewIssues"); // Redirect after resolution
  };
  return (
    <div>
      <div className="border-b pb-4 mb-6">
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="font-semibold text-lg mb-2">{currentIssue.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Service</p>
            <p className="font-medium">{currentIssue.service}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Office</p>
            <p className="font-medium">{currentIssue.office}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Reported By</p>
            <p className="font-medium">{currentIssue.reportedBy}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Resolution Status
          </label>
          <select
            value={resolution.status}
            onChange={(e) =>
              setResolution({ ...resolution, status: e.target.value })
            }
            className="block w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="resolved">Resolved</option>
            <option value="referred">Not resolved</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Resolution Details *
          </label>
          <textarea
            value={resolution.resolutionDetails}
            onChange={(e) =>
              setResolution({
                ...resolution,
                resolutionDetails: e.target.value,
              })
            }
            rows={5}
            className="block w-full border border-gray-300 rounded-md p-2"
            placeholder="Describe how you resolved the issue..."
            required
          />
        </div>

        {/* Time Spent */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Time Spent (minutes) *
          </label>
          <input
            type="number"
            value={resolution.timeSpent}
            onChange={(e) =>
              setResolution({ ...resolution, timeSpent: e.target.value })
            }
            className="block w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g. 45"
            min="1"
            required
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={handleCancelIssue}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Mark as Resolved
          </button>
        </div>
      </form>
    </div>
  );
}
