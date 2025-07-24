import { useContext, useState } from "react";
import { IssueContext } from "../../store/issue-context";
import Modal from "../UI/Modal";
import ResolveIssueForm from "./ResolveIssueForm";
import { useNavigate } from "react-router-dom";

export default function UnresolvedIssues() {
  const { defaultData } = useContext(IssueContext);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  function handleResolveIssue() {
    setOpenModal(true);
  }
  function handleCancelIssue() {
    navigate(1);
    setOpenModal(false);
  }

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6 mt-3 p-5 rounded-lg bg-gray-50">
        {defaultData.map((data) => (
          <div
            key={data.description}
            className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-5 flex-1">
              <div className="flex flex-col space-y-2 mb-4 border-b pb-3">
                <h3 className="text-lg text-gray-800">
                  <span className="text-blue-600 font-bold">Office:</span>{" "}
                  {data.office}
                </h3>
                <h4 className="text-md  text-gray-700">
                  <span className="text-blue-600 font-bold">Service:</span>{" "}
                  {data.service}
                </h4>
              </div>

              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-blue-600 font-medium min-w-[90px]">
                    Type:
                  </span>
                  <p className="text-gray-700">{data.type}</p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 font-medium min-w-[90px]">
                    Description:
                  </span>
                  <p className="text-gray-700">{data.description}</p>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleResolveIssue}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Resolve Issue
              </button>
            </div>
          </div>
        ))}
      </div>
      {openModal && (
        <div className="flex items-center justify-center">
          <Modal>
            <ResolveIssueForm handleCancelIssue={handleCancelIssue} />
          </Modal>
        </div>
      )}
    </>
  );
}
