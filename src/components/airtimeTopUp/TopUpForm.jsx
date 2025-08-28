import { useContext } from "react";
import { IssueContext } from "../../store/issue-context";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export default function TopUpForm({ handleSubmit, errors }) {
  const { formData, saccoList,officeList, serviceList, handleChange, loadingOffices } =
    useContext(IssueContext);
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 md:p-6">
      {/* Office Selection */}

       <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
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
            handleChange({
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

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Office<span className="text-red-500">*</span>
          </label>
          <Select
            options={officeList.map((office) => ({
              value: office.id, // Use office ID
              label: office.name, // Use office name
            }))}
            value={
             formData.office
                ? {
                    value: formData.office,
                    label: formData.officeName || "Select an office",
                  }
                : {
                    value: "",
                    label: "Select an office",
                  }
            }
            onChange={(selectedOption) => {
              const selectedOffice = officeList.find(
                (office) => office.id === selectedOption.value
              );
              handleChange({
                target: {
                  name: "office",
                  value: selectedOffice?.name || selectedOption.value,
                },
              });
            }}
            placeholder={
             loadingOffices
                ? "Loading offices..."
                : "Type to search office..."
            }
            isDisabled={loadingOffices}
            isLoading={loadingOffices}
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

      {/* Service Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Service Platform <span className="text-red-500">*</span>
        </label>
        <Select
          options={serviceList.map((service) => ({
            value: service.name,
            label: service.name,
          }))}
          value={{
            value: formData.serviceName || "",
            label: formData.serviceName || "Select a service",
          }}
          onChange={(selectedOption) => {
            handleChange({
              target: {
                name: "service",
                value: selectedOption.value,
              },
            });
          }}
          placeholder="Type to search services..."
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

      {/* SIM Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SIM Number <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="sim_number"
          value={formData.sim_number}
          onChange={handleChange}
          placeholder="0712345678"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 ${
            errors.sim_number ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.sim_number && (
          <p className="text-red-500 text-xs mt-1">{errors.sim_number}</p>
        )}
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount (KSh) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="500"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 ${
            errors.amount ? "border-red-500" : "border-gray-300"
          }`}
          min="1"
        />
        {errors.amount && (
          <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 ${
            errors.date ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.date && (
          <p className="text-red-500 text-xs mt-1">{errors.date}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
        <button
          type="button"
          onClick={() => navigate("/resolveTopUp")}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 transition-colors"
        >
          Update Top-Up
        </button>
      </div>
    </form>
  );
}
