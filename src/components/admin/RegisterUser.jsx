import  { useState } from "react";
import axios from "axios";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    password: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await axios.post(
        "https://issue-tracker-jywg.onrender.com/api/register/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage({ text: "User registered successfully!", type: "success" });
      setFormData({ username: "", phone_number: "", password: "" }); // Reset form

      return response
    } catch (error) {
      let errorMessage = "An error occurred";
      if (error.response) {
        errorMessage = error.response.data.message || error.response.statusText;
      } else if (error.request) {
        errorMessage = "No response from server";
      } else {
        errorMessage = error.message;
      }
      setMessage({ text: `Error: ${errorMessage}`, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleReset() {
    setFormData({
      username: "",
      phone_number: "",
      password: "",
    });
  }

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow md:ml-5 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 md:w-5xl">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Register New User
            </h2>

            {message.text && (
              <div
                className={`mb-4 p-4 rounded-md ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enter Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. john"
                />
              </div>
              <div>
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enter Phone Number
                </label>
                <input
                  type="number"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 0712345678"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enter Password
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="password"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="reset"
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    isSubmitting
                      ? "bg-indigo-400"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {isSubmitting ? "Registering..." : "Register User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
