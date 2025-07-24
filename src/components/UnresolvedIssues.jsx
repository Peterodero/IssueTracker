import { useContext } from "react";
import { IssueContext } from "../store/issue-context";

export default function UnresolvedIssues({handleResolveIssue}) {
  const { defaultData } = useContext(IssueContext);

  return (
    <div className="grid grid-cols-2 gap-4 mt-3 p-5 shadow rounded bg-gray-200">
      {console.log(defaultData)}
      {defaultData.map((data) => {
        return (
          <div key={data.description} className="flex flex-col bg-white shadow p-4 rounded">
            <div className="flex flex-row gap-4 mb-4">
              <h4 className="text-center">
                <b>Office:</b> {data.office}
              </h4>
              <h5>
                <b>Service:</b> {data.service}
              </h5>
            </div>
            <div>
              <p>
                <span className="text-blue-500">Issue type:</span> {data.type}
              </p>
              <p>
                <span className="text-blue-500">Description:</span>{" "}
                {data.description}
              </p>
            </div>

            <button className="text-green-600 flex justify-end " onClick={handleResolveIssue}>Resolve</button>
          </div>
        );
      })}
    </div>
  );
}
