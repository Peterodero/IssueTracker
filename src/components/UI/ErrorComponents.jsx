// components/UI/ErrorComponents.jsx
import ErrorElement from './ErrorElement';

// 404 Not Found Error
export const NotFoundError = ({ message = "The page you're looking for doesn't exist." }) => (
  <ErrorElement
    title="Page Not Found"
    message={message}
    showRetry={false}
  />
);

// 401 Unauthorized Error
export const UnauthorizedError = ({ message = "You need to be logged in to access this page." }) => (
  <ErrorElement
    title="Unauthorized"
    message={message}
    showRetry={false}
    showHomeButton={false}
  />
);

// 403 Forbidden Error
export const ForbiddenError = ({ message = "You don't have permission to access this resource." }) => (
  <ErrorElement
    title="Access Denied"
    message={message}
    showRetry={false}
  />
);

// Network Error
export const NetworkError = ({ onRetry = null }) => (
  <ErrorElement
    title="Connection Error"
    message="Unable to connect to the server. Please check your internet connection."
    onRetry={onRetry}
    retryText="Retry Connection"
  />
);

// Generic Error with custom actions
export const CustomError = ({ title, message, actions }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="max-w-md w-full text-center">
      <div className="mx-auto w-16 h-16 mb-6 text-red-500">
        {/* Error icon */}
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600 mb-6">{message}</p>
      <div className="flex gap-3 justify-center">
        {actions}
      </div>
    </div>
  </div>
);