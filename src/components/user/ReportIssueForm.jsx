import { useContext, useEffect, useState } from "react";
import { IssueContext } from "../../store/issue-context";
import { issueTypes } from "../../data/model";
import Select from "react-select";

export default function ReportIssueForm() {
  const issueCtx = useContext(IssueContext);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handlePhotoChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const validTypes = [
      "image/png",
      "image/jpeg",
      "application/pdf",
      "text/plain",
      "text/markdown",
      "text/csv",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const files = Array.from(e.target.files).filter(
      (file) => validTypes.includes(file.type) && file.size <= maxSize
    );

    if (files.length !== e.target.files.length) {
      alert("Only PNG, JPG, PDF up to 5MB are allowed.");
      return;
    }

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);

    // Update attachments in formData
    const currentAttachments = Array.isArray(issueCtx.formData.attachments)
      ? issueCtx.formData.attachments
      : [];
    issueCtx.updateAttachments([...currentAttachments, ...files]);

    e.target.value = "";
  };

  const removeImage = (indexToRemove) => {
    URL.revokeObjectURL(previewUrls[indexToRemove]);
    setPreviewUrls((prev) => prev.filter((_, i) => i !== indexToRemove));

    const updatedAttachments = issueCtx.formData.attachments.filter(
      (_, i) => i !== indexToRemove
    );
    issueCtx.updateAttachments(updatedAttachments);
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <form className="p-6" onSubmit={issueCtx.handleSubmitIssueForm}>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Locate Office <span className="text-red-500">*</span>
        </label>
        <Select
          options={issueCtx.officeList.map((office) => ({
            value: office.name,
            label: office.name,
          }))}
          value={{
            value: issueCtx.formData.officeName || "",
            label: issueCtx.formData.officeName || "Select an office",
          }}
          onChange={(selectedOption) => {
            issueCtx.handleChange({
              target: {
                name: "office",
                value: selectedOption.value,
              },
            });
          }}
          placeholder="Type to search offices..."
          className="w-full"
          classNames={{
            control: (state) =>
              `min-h-[42px] border border-gray-300 ${
                state.isFocused
                  ? "!border-orange-300 !ring-2 !ring-orange-200"
                  : ""
              }`,
            option: (state) =>
              `${state.isSelected ? "!bg-orange-500" : ""} ${
                state.isFocused ? "!bg-orange-100" : ""
              }`,
            menu: () => "!mt-1",
            dropdownIndicator: () => "text-gray-400",
            indicatorSeparator: () => "!bg-gray-300",
          }}
          required
        />
      </div>
      {issueCtx.formData.office && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Platform <span className="text-red-500">*</span>
          </label>
          <Select
            options={issueCtx.serviceList.map((service) => ({
              value: service.name,
              label: service.name,
            }))}
            value={{
              value: issueCtx.formData.serviceName || "",
              label: issueCtx.formData.serviceName || "Select a service",
            }}
            onChange={(selectedOption) => {
              issueCtx.handleChange({
                target: {
                  name: "service",
                  value: selectedOption.value,
                },
              });
            }}
            placeholder="Type to search services..."
            className="w-full"
            classNames={{
              control: (state) =>
                `min-h-[42px] border border-gray-300 ${
                  state.isFocused
                    ? "!border-orange-300 !ring-2 !ring-orange-200"
                    : ""
                }`,
              option: (state) =>
                `${state.isSelected ? "!bg-orange-500" : ""} ${
                  state.isFocused ? "!bg-orange-100" : ""
                }`,
              menu: () => "!mt-1",
              dropdownIndicator: () => "text-gray-400",
              indicatorSeparator: () => "!bg-gray-300",
            }}
            required
          />
        </div>
      )}

      {issueCtx.formData.service && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                list="issueTypes"
                value={issueCtx.formData.type}
                name="type"
                onChange={issueCtx.handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
                placeholder="Select or type issue type"
                required
              />
              <datalist id="issueTypes">
                {issueTypes[issueCtx.formData.serviceName]?.map((type) => (
                  <option key={type} value={type} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={issueCtx.formData.description}
              name="description"
              onChange={issueCtx.handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
              placeholder="Describe the issue in detail..."
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments
            </label>
            <div className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-gray-50">
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600 justify-center">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none">
                    <span>Upload files</span>
                    <input
                      type="file"
                      onChange={handlePhotoChange}
                      className="sr-only"
                      multiple
                      accept=".png,.jpg,.jpeg,.pdf,.md,.txt"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>
              </div>
              <div className="flex flex-wrap justify-center mt-4 gap-2">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="h-32 w-auto rounded-md border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {issueCtx.formData.type.includes("Hardware") && (
              <p className="mt-2 text-sm text-red-500 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Photo evidence is required for hardware issues
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors"
              onClick={issueCtx.handleClearForm}
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 transition-colors"
            >
              Submit Issue
            </button>
          </div>
        </>
      )}
    </form>
  );
}
