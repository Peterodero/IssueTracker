import { useContext } from "react";
import { IssueContext } from "../../store/issue-context";
import Modal from "../UI/Modal";
import ReportIssueForm from "./ReportIssueForm";

export default function ReportIssuePage() {
  const { formData, submited, handleModal } = useContext(IssueContext);

  return (
    <>
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow md:ml-5 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 md:w-5xl">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-auto">
        <div className="bg-blue-500 p-6 text-white">
          <h1 className="text-2xl font-bold">Report New Issue</h1>
          <div className="flex mt-4 space-x-6">
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  formData.office ? "bg-blue-300" : "bg-white"
                }`}
              >
                <span
                  className={`text-xs font-bold ${
                    formData.office ? "text-blue-800" : "text-gray-400"
                  }`}
                >
                  1
                </span>
              </div>
              <span
                className={`ml-2 text-sm ${
                  formData.office ? "font-medium" : "text-blue-200"
                }`}
              >
                Select Location
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
                className={`ml-2 text-sm ${
                  formData.service ? "font-medium" : "text-blue-200"
                }`}
              >
                Describe Issue
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white bg-opacity-20">
                <span className="text-xs font-bold text-gray-400">3</span>
              </div>
              <span className="ml-2 text-sm text-blue-200">Review</span>
            </div>
          </div>
        </div>

        <ReportIssueForm />
      </div>
    </div>
    {submited && <Modal>
      <p className="text-lg">Issues submitted successfully!</p>
      <div className="flex items-center justify-between mt-3">
         <p>Click OK to proceed</p>
         <button className='button' onClick={handleModal}>Okay</button>
      </div>
      </Modal>}
    </>
  );
}
