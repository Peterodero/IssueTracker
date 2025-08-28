import Select from "react-select";

function CreateSaccos({
  content,
  isSubmitting,
  handleSubmit,
  handleCancel,
  formData,
  handleChange,
}) {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-3">
      <div className="p-6 md:p-1">
        <h3 className="text-2xl text-center font-bold text-black mb-6 border-b-2 border-orange-300 pb-2">
          Add New Sacco
        </h3>

        {content}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Sacco Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
              placeholder="e.g. Main Sacco"
            />
          </div>

          
          <div className="flex justify-between space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-400 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={
                "px-7 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 bg-green-500 hover:bg-green-600"
              }
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
                      Adding...
                    </span>
                  ) : (
                    "Add"
                  )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSaccos;
