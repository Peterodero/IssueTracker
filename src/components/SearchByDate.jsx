import { useContext } from "react";
import { IssueContext } from "../store/issue-context";

export default function SearchByDate() {

  const {handleIssueDateChange, issueDate, fetchUnresolvedIssuesByDate} = useContext(IssueContext)

  async function handleSubmit(e){
    e.preventDefault()
    await fetchUnresolvedIssuesByDate()
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center gap-4"
      >
        <div className="w-full md:w-auto">
          <label
            htmlFor="start-date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start date
          </label>
          <input
            id="start-date"
            name="startDate"
            onChange={handleIssueDateChange}
            value={issueDate.startDate}
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
          />
        </div>
        <div className="w-full md:w-auto">
          <label
            htmlFor="end-date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End date
          </label>
          <input
            id="end-date"
            name="endDate"
            onChange={handleIssueDateChange}
            value={issueDate.endDate}
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-auto mt-6 md:mt-6 px-6 py-2 bg-orange-300 text-white font-medium rounded-md hover:bg-orange-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
        >
          Search Issues
        </button>
      </form>
    </div>
  );
}
