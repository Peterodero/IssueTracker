// components/UI/ErrorElement.jsx
import { useEffect, useState } from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';

const ErrorElement = ({ 
  error = null, 
  title = "Something went wrong", 
  message = "An unexpected error occurred", 
  showRetry = true,
  retryText = "Try Again",
  onRetry = null,
  showHomeButton = true,
  className = "" 
}) => {
  const routeError = useRouteError();
  const navigate = useNavigate();
  const [displayedError, setDisplayedError] = useState(error || routeError);

  useEffect(() => {
    console.error('Error occurred:', displayedError);
  }, [displayedError]);

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const getErrorMessage = () => {
    if (typeof displayedError === 'string') return displayedError;
    if (displayedError?.message) return displayedError.message;
    if (displayedError?.statusText) return displayedError.statusText;
    return message;
  };

  const getErrorTitle = () => {
    if (displayedError?.status) {
      switch (displayedError.status) {
        case 404: return "Page Not Found";
        case 401: return "Unauthorized";
        case 403: return "Access Denied";
        case 500: return "Server Error";
        default: return `Error ${displayedError.status}`;
      }
    }
    return title;
  };

  return (
    <div className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 ${className}`}>
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mx-auto w-16 h-16 mb-6">
          <svg className="w-full h-full text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        {/* Error Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {getErrorTitle()}
        </h1>

        {/* Error Message */}
        <p className="text-gray-600 mb-6">
          {getErrorMessage()}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRetry && (
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {retryText}
            </button>
          )}
          
          {showHomeButton && (
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Go Home
            </button>
          )}
        </div>

        {/* Debug Info (only in development)
        {process.env.NODE_ENV === 'development' && displayedError && (
          <details className="mt-6 text-left">
            <summary className="text-sm text-gray-500 cursor-pointer">Error Details</summary>
            <pre className="mt-2 p-3 bg-gray-100 rounded-md text-xs overflow-x-auto">
              {JSON.stringify(displayedError, null, 2)}
            </pre>
          </details>
        )} */}
      </div>
    </div>
  );
};

export default ErrorElement;