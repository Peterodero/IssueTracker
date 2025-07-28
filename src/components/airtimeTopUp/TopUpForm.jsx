import { useContext } from "react";
import { IssueContext } from "../../store/issue-context";
import { useNavigate } from "react-router-dom";

export default function TopUpForm({ handleSubmit, errors }) {
  const { formData, officeList, serviceList, handleChange } = useContext(IssueContext);

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Office Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Office *
        </label>
        <select
          name="office"
          value={formData.officeName}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md ${
            errors.office ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Office</option>
          {officeList.map((office) => (
            <option key={office.id} value={office.name}>
              {office.name}
            </option>
          ))}
        </select>
        {errors.office && (
          <p className="text-red-500 text-xs mt-1">{errors.office}</p>
        )}
      </div>

      {/* Service Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Service *
        </label>
        <select
          name="service"
          value={formData.serviceName}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md ${
            errors.service ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Service</option>
          {serviceList.map((service) => (
            <option key={service.id} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="text-red-500 text-xs mt-1">{errors.service}</p>
        )}
      </div>

      {/* SIM Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          SIM Number *
        </label>
        <input
          type="text"
          name="sim_number"
          value={formData.sim_number}
          onChange={handleChange}
          placeholder="0712345678"
          className={`w-full p-2 border rounded-md ${
            errors.simNumber ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.sim_number && (
          <p className="text-red-500 text-xs mt-1">{errors.sim_number}</p>
        )}
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount (KSh) *
        </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="500"
          className={`w-full p-2 border rounded-md ${
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
           Date *
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          placeholder="2025-07-17"
          className={`w-full p-2 border rounded-md ${
            errors.amount ? "border-red-500" : "border-gray-300"
          }`}
          min="1"
        />
        {errors.amount && (
          <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
        )}
      </div>


      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={() => navigate("/resolveTopUp")}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Update Top-Up
        </button>
      </div>
    </form>
  );
}
