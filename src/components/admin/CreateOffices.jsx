import { useState, useEffect } from "react";
import { createOffices } from "../../util/http";
import { getAllOffices } from "../../util/http";

// const url = "https://issue-tracker-jywg.onrender.com/api";

const CreateOffices = () => {
  const [formData, setFormData] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [offices, setOffices] = useState([]);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const allOffices = await getAllOffices();
        console.log(allOffices);

        setOffices(allOffices);
      } catch (error) {
        console.error("Error loading issues:", error);
      }
    };

    loadData();
  }, []);

  console.log(offices);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData(value);
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log(formData);

    try {
      const response = await createOffices({ name: formData });
      console.log(response.status);
      if (response.status >= 200 && response.status < 300) {
        setMessage("Office creation successful!");
      }
      const data = await response.json();
      console.log(data);
      if (response.status === 400) {
        setErrMessage(data.errors?.name?.[0]);
      }
      // setMessage("Office creation successful!");
    } catch (error) {
      setErrMessage("Failed to create office. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
      setMessage("");

      console.log(errMessage);
    }
  };
  let content;

  if (errMessage) {
    content = (
      <div className="mb-4 p-4 rounded-md bg-red-50 text-red-800 border border-red-200">
        {errMessage}
      </div>
    );
  }
  if (message) {
    content = (
      <div className="mb-4 p-4 rounded-md bg-green-100 text-gray-500 border border-red-200">
        {message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl text-center font-bold text-black mb-6 border-b-2 border-orange-300 pb-2">
              Create New Office
            </h2>

            {content}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="office"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Office <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="office"
                  name="office"
                  value={formData}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
                  placeholder="e.g. Nairobi"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 transition-colors ${
                    isSubmitting
                      ? "bg-orange-400 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    "Create Office"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOffices;
