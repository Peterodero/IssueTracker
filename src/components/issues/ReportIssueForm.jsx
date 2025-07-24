import { useContext, useEffect, useState } from "react";
import { IssueContext } from "../../store/issue-context";
import { userOffices, serviceMap, issueTypes } from "../../data/model";

export default function ReportIssueForm() {
  const issueCtx = useContext(IssueContext);

  const [imageUrls, setImageUrls] = useState([]);

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImageUrls((prev) => [...prev, ...urls]);
  };

  const removeImage = (indexToRemove) => {
    URL.revokeObjectURL(imageUrls[indexToRemove]);
    // Remove the image from state
    setImageUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Clean up all object URLs when component unmounts
  useEffect(() => {
    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  return (
    <form className="p-6" onSubmit={issueCtx.handleSubmitForm}>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Locate Office
        </label>
        <select
          value={issueCtx.formData.office}
          name="office"
          onChange={(event) => issueCtx.handleChange(event)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          required
        >
          <option value="">Select an office</option>
          {userOffices.map((office) => (
            <option key={office} value={office}>
              {office}
            </option>
          ))}
        </select>
      </div>

      {issueCtx.formData.office && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Platform
          </label>
          <select
            value={issueCtx.formData.service}
            name="service"
            onChange={(event) => issueCtx.handleChange(event)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            required
          >
            <option value="">Select a service</option>
            {serviceMap[issueCtx.formData.office]?.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      )}

      {issueCtx.formData.service && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issue Type
            </label>
            <select
              value={issueCtx.formData.type}
              name="type"
              onChange={(event) => issueCtx.handleChange(event)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              required
            >
              <option value="">Select issue type</option>
              {issueTypes[issueCtx.formData.service]?.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={issueCtx.formData.description}
              name="description"
              onChange={(event) => issueCtx.handleChange(event)}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Describe the issue in detail..."
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attachments
            </label>
            <div className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600 justify-center">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>Upload files</span>
                    <input
                      type="file"
                      onChange={handlePhotoChange}
                      className="sr-only"
                      multiple
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>
              </div>
              {imageUrls.map((url, index) => (
                <div key={index} className="inline-block m-2">
                  <img
                    src={url}
                    alt={`Preview ${index}`}
                    className="h-32 w-auto"
                  />
                  <button onClick={() => removeImage(index)}>×</button>
                </div>
              ))}
            </div>
            {issueCtx.formData.type.includes("Hardware") && (
              <p className="mt-1 text-sm text-red-500">
                ⚠️ Photo evidence is required for hardware issues
              </p>
            )}
          </div>

          <div className="flex justify-between space-x-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={issueCtx.handleClearForm}
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Issue
            </button>
          </div>
        </>
      )}
    </form>
  );
}
