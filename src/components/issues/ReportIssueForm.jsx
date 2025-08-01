import { useContext, useEffect, useState } from "react";
import { IssueContext } from "../../store/issue-context";
import { issueTypes } from "../../data/model";

export default function ReportIssueForm() {
  const issueCtx = useContext(IssueContext);
  const [previewUrls, setPreviewUrls] = useState([]);

 const handlePhotoChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const validTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    const files = Array.from(e.target.files).filter(file => 
      validTypes.includes(file.type) && file.size <= maxSize
    );

    if (files.length !== e.target.files.length) {
      alert('Only PNG, JPG, PDF up to 5MB are allowed.');
      return;
    }

    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...urls]);
    
    // Update attachments in formData
    const currentAttachments = Array.isArray(issueCtx.formData.attachments) 
      ? issueCtx.formData.attachments 
      : [];
    issueCtx.updateAttachments([...currentAttachments, ...files]);
    
    e.target.value = '';
  };

  const removeImage = (indexToRemove) => {
    URL.revokeObjectURL(previewUrls[indexToRemove]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== indexToRemove));
    
    const updatedAttachments = issueCtx.formData.attachments
      .filter((_, i) => i !== indexToRemove);
    issueCtx.updateAttachments(updatedAttachments);
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <form className="p-6" onSubmit={issueCtx.handleSubmitIssueForm}>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Locate Office</label>
        <select
          value={issueCtx.formData.officeName || ""}
          name="office"
          onChange={issueCtx.handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          required
        >
          <option value="">Select an office</option>
          {issueCtx.officeList.map((office) => (
            <option key={office.id} value={office.name}>{office.name}</option>
          ))}
        </select>
      </div>

      {issueCtx.formData.office && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Platform</label>
          <select
            value={issueCtx.formData.serviceName}
            name="service"
            onChange={issueCtx.handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            required
          >
            <option value="">Select a service</option>
            {issueCtx.serviceList.map((service) => (
              <option key={service.id} value={service.name}>{service.name}</option>
            ))}
          </select>
        </div>
      )}

      {issueCtx.formData.service && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
            <div className="relative">
              <input
                list="issueTypes"
                value={issueCtx.formData.type}
                name="type"
                onChange={issueCtx.handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={issueCtx.formData.description}
              name="description"
              onChange={issueCtx.handleChange}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Describe the issue in detail..."
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
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
                      accept=".png,.jpg,.jpeg,.pdf"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>
              </div>
              <div className="flex flex-wrap justify-center mt-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative m-2">
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="h-32 w-auto"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
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