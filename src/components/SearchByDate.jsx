import { useContext, useEffect } from "react";
import { IssueContext } from "../store/issue-context";
import  Select from "react-select";

export default function SearchByDate({handleSubmit, searching}) {

  const {handleIssueDateChange, issueDate, saccoList, formData, fetchSaccos} = useContext(IssueContext)

    useEffect(()=>{
      fetchSaccos()
    }, [fetchSaccos])

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <form
        onSubmit={(e)=>handleSubmit(e)}
        className="flex flex-col md:flex-row items-center gap-10"
      >
        <div className="w-full md:w-auto">
          <label
            htmlFor="start-date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start date <span className="text-red-500">*</span>
          </label>
          <input
            id="start-date"
            name="startDate"
            onChange={handleIssueDateChange}
            value={issueDate.startDate}
            type="date"
            className="w-full px-4 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
          />
        </div>
        <div className="w-full md:w-auto">
          <label
            htmlFor="end-date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End date <span className="text-red-500">*</span>
          </label>
          <input
            id="end-date"
            name="endDate"
            onChange={handleIssueDateChange}
            value={issueDate.endDate}
            type="date"
            className="w-full px-4 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
          />
        </div>
        <div className="w-full md:w-auto">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Sacco<span className="text-red-500">*</span>
        </label>
        <Select
          options={saccoList.map((sacco) => ({
            value: sacco.name,
            label: sacco.name,
          }))}
          value={{
            value: formData.saccoName || "",
            label: formData.saccoName || "Select a sacco",
          }}
          onChange={(selectedOption) => {
            handleIssueDateChange({
              target: {
                name: "sacco",
                value: selectedOption.value,
              },
            });
          }}
          placeholder="Type to search saccos..."
          className="w-full"
          classNames={{
            control: (state) =>
              `min-h-[42px] border border-gray-300 ${
                state.isFocused
                  ? "!border-orange-300 !ring-2 !ring-orange-200"
                  : ""
              }`,
            option: (state) =>
              `${state.isSelected ? "!bg-orange-500" : ""} ${
                state.isFocused ? "!bg-orange-100" : ""
              }`,
            menu: () => "!mt-1",
            dropdownIndicator: () => "text-gray-400",
            indicatorSeparator: () => "!bg-gray-300",
          }}
          required
        />
      </div>
        <button
          type="submit"
          className="w-full md:w-auto mt-6 md:mt-6 px-6 py-2 bg-orange-400 text-white font-medium rounded-md hover:bg-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
        >
         {searching ? "Searching..."  : "Search"}
        </button>
      </form>
    </div>
  );
}
