import { useContext, useEffect } from "react";
import { IssueContext } from "../../store/issue-context";
import Modal from "../UI/Modal";
import ReportIssueForm from "./ReportIssueForm";

export default function ReportIssuePage() {
  const {
    formData,
    submited,
    handleModal,
    fetchSaccos,
    fetchServices,
    errMessage,
    message,
  } = useContext(IssueContext);

  useEffect(() => {
    fetchSaccos();
  }, [fetchSaccos]);

  useEffect(() => {
    if (formData.sacco) {
      fetchServices();
    }
  }, [formData.sacco, fetchServices]);

  let content;
  let cssClass;

  if (errMessage) {
    content = errMessage;
    cssClass = "bg-red-50 text-red-800 border border-red-200";
  }
  if (message) {
    content = message;
    cssClass = "bg-green-100 text-green-800 border border-green-200";
  }

  return (
    <>
      <div className="p-6 rounded shadow bg-gray-50 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md">
          <div className="flex flex-col bg-orange-300 md:p-6 p-3 rounded-lg text-black">
            <h2 className="text-2xl font-bold">Report New Issue</h2>
            <div className="flex mt-4 md:space-x-6 space-x-4">
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    formData.sacco ? "bg-blue-300" : "bg-white"
                  }`}
                >
                  <span
                    className={`text-xs font-bold ${
                      formData.sacco ? "text-blue-800" : "text-gray-400"
                    }`}
                  >
                    1
                  </span>
                </div>
                <span
                  className={`ml-1 text-sm ${
                    formData.sacco ? "font-medium" : "text-blue-200"
                  }`}
                >
                  Location
                </span>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    formData.service ? "bg-blue-300" : "bg-white bg-opacity-20"
                  }`}
                >
                  <span
                    className={`text-xs font-bold ${
                      formData.service ? "text-blue-800" : "text-gray-400"
                    }`}
                  >
                    2
                  </span>
                </div>
                <span
                  className={`ml-1 text-sm ${
                    formData.service ? "font-medium" : "text-blue-200"
                  }`}
                >
                  Issue
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white bg-opacity-20">
                  <span className="text-xs font-bold text-gray-400">3</span>
                </div>
                <span className="ml-1 text-sm text-blue-200">Review</span>
              </div>
            </div>
          </div>

          <ReportIssueForm />
        </div>
      </div>
      {submited && (
        <div className="flex items-center justify-center">
          <Modal>
            <div className={`mb-3 p-4 rounded-md ${cssClass}`}>
              <div className="mb-4 ">{content}</div>
              <div className="flex justify-between m-1">
                <div></div>
                <button
                  className="bg-orange-300 text-gray-500 align-super justify-end py-1 px-3 rounded"
                  onClick={handleModal}
                >
                  Okay
                </button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}
