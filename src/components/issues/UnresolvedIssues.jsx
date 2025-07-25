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
  let number = 0;

  return (
    <>
      <div className=" max-w-5xl md:w-4xl mx-auto overflow-scroll  md:ml-10 p-4">
        <div className=" rounded-lg ">
          <table className="w-full ">
            <thead>
              <tr className="border-b border-gray-200 bg-blue-200">
                <th className="py-5 px-4 text-left text-sm font-semibold text-gray-700">
                  #
                </th>
                <th className="py-5 px-4 text-left text-sm font-semibold text-gray-700">
                  Office
                </th>
                <th className="py-5 px-4 text-left text-sm font-semibold text-gray-700 sm:table-cell">
                  Service
                </th>
                <th className="py-5 px-4 text-left text-sm font-semibold text-gray-700">
                  By 
                </th>
                 <th className="py-5 px-4 text-left text-sm font-semibold text-gray-700 sm:table-cell">
                  Issue
                </th>
                 <th className="py-5 px-4 text-left text-sm font-semibold text-gray-700 sm:table-cell">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-200">
              {defaultData.map((data) => {
                number = number + 1;
                return (
                  <tr
                    key={data.description}
                    className="hover:bg-orange-200 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                         number % 2 ===  0
                            ? "bg-purple-200 text-yellow-800"
        
                            : "bg-orange-100 text-gray-800"
                        }`}
                      >
                        {number}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-800">
                      {data.office}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 sm:table-cell">
                      {data.service}
                    </td>
                    <td className="py-3 px-4 text-sm font-bold text-gray-900">
                      <p>Peter</p>
                    </td>
                    <td className="py-3 px-4 text-sm font-bold text-gray-900">
                      {data.type}
                    </td>
                    <td className="py-3 px-4 text-sm font-bold text-gray-900">
                      <p>Resolved</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
