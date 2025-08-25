// components/Login.jsx (UPDATED)
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { passwordValidator } from "../util/validation";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser, refreshAuthToken, clearSession } from "../util/http";
import ErrorBlock from "./UI/ErrorBlock";

export default function Login() {
  const [searchParams] = useSearchParams();
  const shouldRefresh = searchParams.get("refresh") === "true";
  const sessionExpired = searchParams.get("error") === "session_expired";
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [errLogin, setErrLogin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Clear any existing session on component mount
  useEffect(() => {
    if (sessionExpired) {
      clearSession();
    }
  }, [sessionExpired]);

  // Auto-refresh logic
  useEffect(() => {
    const attemptAutoRefresh = async () => {
      if (shouldRefresh) {
        try {
          const newToken = await refreshAuthToken();
          if (newToken) {
            const role = sessionStorage.getItem("role");
            navigate(role === "admin" ? "/admin" : "/landing");
          }
        } catch (error) {
          console.log(error.message);
          if (error.message === "REFRESH_TOKEN_EXPIRED") {
            clearSession();
            setErrLogin("Your session has expired. Please login again.");
          } else {
            setErrLogin("Login failed. Please login again.");
          }
        }
      }
    };

    attemptAutoRefresh();
  }, [shouldRefresh, navigate]);

  const { mutate, isPending } = useMutation({
    mutationFn: authenticateUser,
    onSuccess: (data) => {
      if (typeof data === "string") {
        setErrLogin(data);
        return;
      }

      sessionStorage.setItem("accessToken", data.access);
      sessionStorage.setItem("refreshToken", data.refresh);
      sessionStorage.setItem("role", data.role);
      sessionStorage.setItem("username", data.username);

      if (data.role === "admin") {
        navigate("/admin");
      } else if (data.role === "user") {
        navigate("/landing");
      } else {
        setErrLogin("Unknown user role");
      }
    },
    onError: (error) => {
      setErrLogin(error.message || "Login failed");
    },
  });

  function handleFormSubmit(event) {
    event.preventDefault();
    setErrLogin(""); // Clear previous errors

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
          {sessionExpired && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-md">
              <p className="text-yellow-800 text-sm">
                Your previous session has expired.
              </p>
            </div>
          )}
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-600">
            {sessionExpired
              ? "Please login again to continue"
              : "Please login to continue"}
          </p>
        </div>

        <form
          className="bg-white shadow-lg rounded-xl p-8 border border-gray-200"
          onSubmit={handleFormSubmit}
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-orange-500"
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
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
                isPending
                  ? "bg-orange-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {isPending ? (
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
                  Logging In...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        {errLogin && (
          <div className="mt-6">
            <ErrorBlock title="Login Failed" message={errLogin} />
          </div>
        )}
      </div>
    </div>
  );
}
