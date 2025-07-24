import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userOffices } from "../data/model";

const UpdateTopUp = () => {
  const { topUpId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    office: "",
    service: "",
    simNumber: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const services = ["Mzigo", "TKT", "Defoca", "Deductions"];

  useEffect(() => {
    // Fetch existing top-up data (replace with your API call)
    const fetchTopUpData = async () => {
      try {
        // Simulated API response
        const mockData = {
          office: "Nairobi West",
          service: "Mzigo",
          simNumber: "0712345678",
          amount: "500",
          date: "2023-06-20",
        };
        setFormData(mockData);
      } catch (error) {
        console.error("Failed to fetch top-up data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopUpData();
  }, [topUpId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.office) newErrors.office = "Office is required";
    if (!formData.service) newErrors.service = "Service is required";
    if (!formData.simNumber) newErrors.simNumber = "SIM number is required";
    if (!formData.amount || isNaN(formData.amount))
      newErrors.amount = "Valid amount is required";
    if (!formData.date) newErrors.date = "Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit logic here (API call)
      console.log("Updating top-up:", formData);
      alert("Top-up updated successfully!");
      navigate("/resolveTopUp"); 
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading top-up data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow md:ml-5 min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 md:w-5xl">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Update Airtime Top-Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Office Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Office *
            </label>
            <select
              name="office"
              value={formData.office}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${
                errors.office ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Office</option>
              {userOffices.map((office) => (
                <option key={office} value={office}>
                  {office}
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
              value={formData.service}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${
                errors.service ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
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
              name="simNumber"
              value={formData.simNumber}
              onChange={handleChange}
              placeholder="0712345678"
              className={`w-full p-2 border rounded-md ${
                errors.simNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.simNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.simNumber}</p>
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
              className={`w-full p-2 border rounded-md ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/top-ups")}
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
      </div>
    </div>
  );
};

export default UpdateTopUp;
