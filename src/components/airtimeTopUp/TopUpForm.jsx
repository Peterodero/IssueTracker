import { useContext } from "react";
import { IssueContext } from "../../store/issue-context";
import { useNavigate } from "react-router-dom";

export default function TopUpForm({ handleSubmit, errors }) {
  const { formData, officeList, serviceList, handleChange } = useContext(IssueContext);
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 md:p-6">
      {/* Office Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Office <span className="text-red-500">*</span>
        </label>
        <select
          name="office"
          value={formData.officeName}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 ${
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Service <span className="text-red-500">*</span>
        </label>
        <select
          name="service"
          value={formData.serviceName}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 ${
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SIM Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
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