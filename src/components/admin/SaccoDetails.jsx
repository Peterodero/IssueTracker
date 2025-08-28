import { useParams, useNavigate, useLocation } from "react-router-dom";
import ErrorBlock from "../UI/ErrorBlock";
import { formatDate } from "../../util/date";
import {
  BuildingOfficeIcon,
  CalendarIcon,
  IdentificationIcon,
  MapPinIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SaccoDetails() {
  const saccoId = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { sacco } = location.state || {};
  const [offices, setOffices] = useState(sacco.offices || []);
  const [isDeleting, setIsDeleting] = useState(false);
  const [officeToDelete, setOfficeToDelete] = useState(null);

  const handleDeleteOffice = async (officeId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this office? This action cannot be undone."
      )
    ) {
      setOfficeToDelete(null);
      return;
    }

    setIsDeleting(true);
    try {
      // Here you would make an API call to delete the office
      // For now, we'll just simulate it
      console.log("Deleting office with ID:", officeId);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Remove the office from the local state
      setOffices((prev) => prev.filter((office) => office.id !== officeId));
      setOfficeToDelete(null);

      // Show success message (you could use a toast notification here)
      alert("Office deleted successfully!");
    } catch (error) {
      console.error("Failed to delete office:", error);
      alert("Failed to delete office. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const showDeleteConfirmation = (officeId) => {
    setOfficeToDelete(officeId);
  };

  const cancelDelete = () => {
    setOfficeToDelete(null);
  };

  if (!sacco) {
    return <ErrorBlock message="Sacco not found" />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          Back to Saccos
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Sacco Details</h2>
        <div className="w-24"></div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Sacco Header */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-400 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-full">
              <BuildingOfficeIcon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{sacco.name}</h1>
              <p className="text-orange-100 mt-1">Sacco Management System</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Basic Information */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-orange-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <IdentificationIcon className="h-5 w-5 text-orange-600" />
                Basic Information
              </h3>
              <div className="space-y-4">
                <DetailItem label="Sacco Name" value={sacco.name} />
                <DetailItem
                  label="Date Created"
                  value={formatDate(sacco.created_at)}
                  icon={<CalendarIcon className="h-4 w-4" />}
                />
              </div>
            </div>

            {/* Offices Section */}
            <div className="bg-white p-5 rounded-lg border border-orange-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-orange-600" />
                Offices ({offices.length})
              </h3>
              <div className="space-y-4">
                {offices.length > 0 ? (
                  offices.map((office) => (
                    <OfficeCard
                      key={office.id}
                      office={office}
                      isDeleting={isDeleting}
                      showDeleteConfirmation={showDeleteConfirmation}
                      cancelDelete={cancelDelete}
                      handleDeleteOffice={handleDeleteOffice}
                      isConfirmingDelete={officeToDelete === office.id}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 italic py-4 text-center">
                    No offices registered for this sacco.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Statistics and Actions */}
          <div className="space-y-6">
            {/* Statistics Card */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-5 rounded-lg border border-orange-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Sacco Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  title="Total Offices"
                  value={offices.length}
                  color="orange"
                />
                <StatCard
                  title="Active Since"
                  value={new Date(sacco.created_at).getFullYear()}
                  color="yellow"
                />
                <StatCard title="Status" value="Active" color="green" />
                <StatCard
                  title="Members"
                  value="125"
                  color="black"
                  subtitle="Approx."
                />
              </div>
            </div>

            {/* Actions Card */}
            {/* <div className="bg-white p-5 rounded-lg border border-orange-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <ActionButton
                  label="View Members"
                  onClick={() => console.log("View members")}
                  color="orange"
                />
                <ActionButton
                  label="Manage Offices"
                  onClick={() => console.log("Manage offices")}
                  color="yellow"
                />
                <ActionButton
                  label="Edit Sacco Details"
                  onClick={() => console.log("Edit sacco")}
                  color="black"
                />
                <ActionButton
                  label="Generate Report"
                  onClick={() => console.log("Generate report")}
                  color="white"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function OfficeCard({
  office,
  isDeleting,
  showDeleteConfirmation,
  cancelDelete,
  handleDeleteOffice,
  isConfirmingDelete,
}) {
  return (
    <div className="bg-white p-4 rounded-lg border border-orange-100 shadow-sm relative">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{office.name}</h4>
          <div className="mt-2 text-sm text-gray-500 space-y-1">
            <p>Created: {formatDate(office.created_at)}</p>
          </div>
        </div>

        {!isConfirmingDelete ? (
          <button
            onClick={() => showDeleteConfirmation(office.id)}
            disabled={isDeleting}
            className="ml-3 p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete office"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        ) : (
          <button
            onClick={cancelDelete}
            className="ml-3 p-2 text-gray-500 hover:text-gray-700 transition-colors"
            title="Cancel delete"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Delete confirmation overlay - only shown when isConfirmingDelete is true */}
      {isConfirmingDelete && (
        <div className="absolute inset-0 bg-gray-400 bg-opacity-80 flex items-center justify-center rounded-lg p-3">
          <div className="text-white text-center">
            <p className="text-sm mb-2">Delete this office?</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => handleDeleteOffice(office.id)}
                disabled={isDeleting}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Confirm"}
              </button>
              <button
                onClick={cancelDelete}
                disabled={isDeleting}
                className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value, icon, copyable = false }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    // You could add a toast notification here
  };

  return (
    <div className="flex justify-between items-start py-2 border-b border-orange-100 last:border-b-0">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          {icon && <span className="text-orange-500">{icon}</span>}
          <p className="text-gray-900 font-medium">{value || "-"}</p>
        </div>
      </div>
      {copyable && (
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-orange-600 transition-colors ml-2"
          title="Copy to clipboard"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

function StatCard({ title, value, color, subtitle }) {
  const colorClasses = {
    orange: "bg-orange-100 text-orange-800",
    yellow: "bg-yellow-100 text-yellow-800",
    green: "bg-green-100 text-green-800",
    black: "bg-black text-white",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100 text-center">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className={`text-2xl font-bold mb-1 ${colorClasses[color]}`}>
        {value}
      </p>
      {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
    </div>
  );
}

function ActionButton({ label, onClick, color }) {
  const colorClasses = {
    orange: "bg-orange-600 hover:bg-orange-700 text-white",
    yellow: "bg-yellow-500 hover:bg-yellow-600 text-white",
    black: "bg-black hover:bg-gray-800 text-white",
    white: "bg-white hover:bg-gray-100 text-black border border-gray-300",
  };

  return (
    <button
      onClick={onClick}
      className={`w-full py-2 px-4 rounded-lg transition-colors font-medium ${colorClasses[color]}`}
    >
      {label}
    </button>
  );
}
