import { useState } from "react";
import { passwordValidator } from "../util/validation";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "../util/http";
import ErrorBlock from "./UI/ErrorBlock";

export default function Login() {
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const navigate = useNavigate();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: authenticateUser,
    onSuccess: (data) => {
      sessionStorage.setItem("accessToken", data.access);
      sessionStorage.setItem("refreshToken", data.refresh);
      sessionStorage.setItem("role", data.role);

      navigate(data.role === 'admin' ? "/admin" : "/landing");
    },
  });

  function handleFormSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    data.username = data.username.trim();

    const validatePassword = passwordValidator(data.password, 6);
    setPasswordIsValid(validatePassword);

    if (!validatePassword) {
      return;
    }
    mutate(data);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
          <p className="text-gray-600">Please login to continue</p>
        </div>

        <form
          className="bg-white shadow-lg rounded-xl p-8 border border-gray-200"
          onSubmit={handleFormSubmit}
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                name="username"
                placeholder="Enter your username"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
              />
              {!passwordIsValid && (
                <p className="mt-1 text-sm text-red-500">
                  Password must be at least 6 characters
                </p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isPending}
              className={`w-full px-6 py-3 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 transition-colors ${
                isPending ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {isPending ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging In...
                </span>
              ) : 'Login'}
            </button>
          </div>
        </form>

        {isError && (
          <div className="mt-6">
            <ErrorBlock
              title="Login Failed"
              message={
                error?.detail || "Invalid credentials. Please try again."
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}