import { useEffect, useState } from "react";
import Select from "react-select";
import { IssueContext } from "../../store/issue-context";
import { authFetch, getAllOffices } from "../../util/http";

const url = "https://issue-tracker-jywg.onrender.com/api";

const CreateSaccos = () => {
  const [formData, setFormData] = useState({
    name: "",
    office: "", // This will store the office ID for submission
  });
  const [offices, setOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(null); // For React Select value
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const allOffices = await getAllOffices();
        // Ensure offices is an array of objects with id and name
        setOffices(allOffices);
      } catch (error) {
        console.error("Error loading offices:", error);
      }
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData);
  };

  const handleOfficeChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedOffice(selectedOption);
      // Store the office ID in formData for submission
      setFormData((prev) => ({ ...prev, office: selectedOption.value }));
      console.log(formData);
    } else {
      setSelectedOffice(null);
      setFormData((prev) => ({ ...prev, office: "" }));
    }
  };

  async function createSaccos(formData) {
    try {
      const response = await authFetch(url + "/saccos/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          office: formData.office, // This should be the office ID
        }),
      });

      const data = await response.json();
      if (response.status >= 200 && response.status < 300) {
        setMessage("Office creation successful!");
        // Reset form
        setFormData({ name: "", office: "" });
        setSelectedOffice(null);
      }
      if (response.status === 400) {
        setErrMessage(data.errors?.non_field_errors?.[0] || "Validation error");
      }

      return data;
    } catch (error) {
      console.log(error.message);
      setErrMessage("Network error. Please try again.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrMessage("");
    setMessage("");

    // Validation
    if (!formData.office) {
      setErrMessage("Please select an office");
      setIsSubmitting(false);
      return;
    }

    try {
      await createSaccos(formData);
    } catch (error) {
      setErrMessage("Failed to create office. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
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
      <div className="mb-4 p-4 rounded-md bg-green-100 text-green-800 border border-green-200">
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
              Create New Sacco
            </h2>

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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
                  placeholder="e.g. Main Sacco"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Office<span className="text-red-500">*</span>
                </label>
                <Select
                  options={offices.map((office) => ({
                    value: office.id, // Store the ID as value
                    label: office.name, // Display the name as label
                  }))}
                  value={selectedOffice}
                  onChange={handleOfficeChange}
                  placeholder="Select an office..."
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
                  isClearable
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ name: "", office: "" });
                    setSelectedOffice(null);
                    setErrMessage("");
                    setMessage("");
                  }}
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
                    "Create Sacco"
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

export default CreateSaccos;

// import  { useContext, useEffect, useState } from "react";
// import Select from "react-select";
// import { IssueContext } from "../../store/issue-context";
// import { useQuery } from "@tanstack/react-query";
// import { getAllOffices } from "../../util/http";

// // import { createOffices } from "../../util/http";

// const url = "https://issue-tracker-jywg.onrender.com/api";

// const CreateSaccos = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//   });
//   const [offices, setOffices] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errMessage, setErrMessage] = useState("");

//   const issueCtx = useContext(IssueContext);

//      useEffect(() => {
//     const loadData = async () => {
//       try {
//         const allOffices = await getAllOffices();
//         setOffices(allOffices)

//       } catch (error) {
//         console.error("Error loading issues:", error);
//       }
//     };

//     loadData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
//   async function createOffices(formData) {
//     try {
//       const response = await fetch(url + "/offices/create/", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       if (response.status >= 200 && response.status < 300) {
//         setMessage("Office creation successful!");
//       }
//       if (response.status === 400) {
//         setErrMessage(data.errors?.non_field_errors?.[0]);
//       }

//       return data;
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       await createOffices(formData);
//     } catch (error) {
//       setErrMessage("Failed to create office. Please try again.");
//       console.error("Submission error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   let content;

//   if (errMessage) {
//     content = (
//       <div className="mb-4 p-4 rounded-md bg-red-50 text-red-800 border border-red-200">
//         {errMessage}
//       </div>
//     );
//   }
//   if (message) {
//     content = (
//       <div className="mb-4 p-4 rounded-md bg-green-100 text-gray-500 border border-red-200">
//         {message}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white p-4 md:p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
//           <div className="p-6 md:p-8">
//             <h2 className="text-2xl text-center font-bold text-black mb-6 border-b-2 border-orange-300 pb-2">
//               Create New Sacco
//             </h2>

//             {content}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700 mb-2"
//                 >
//                   Sacco Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
//                   placeholder="e.g. Main Sacco"
//                 />
//               </div>

//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Select Office<span className="text-red-500">*</span>
//                 </label>
//                 <Select
//                   options={offices.map((office) => ({
//                     value: office.id, // Use office ID
//                     label: office.name, // Use office name
//                   }))}
//                   value={
//                     issueCtx.formData.office
//                       ? {
//                           value: issueCtx.formData.office,
//                           label:
//                             issueCtx.formData.officeName || "Select an office",
//                         }
//                       : {
//                           value: "",
//                           label: "Select an office",
//                         }
//                   }
//                   onChange={(selectedOption) => {
//                     const selectedOffice = issueCtx.allOfficeList.find(
//                       (office) => office.id === selectedOption.value
//                     );
//                     issueCtx.handleChange({
//                       target: {
//                         name: "office",
//                         value: selectedOffice?.name || selectedOption.value,
//                       },
//                     });
//                   }}
//                   placeholder="Type to search office..."
//                   className="w-full"
//                   classNames={{
//                     control: (state) =>
//                       `min-h-[42px] border border-gray-300 ${
//                         state.isFocused
//                           ? "!border-orange-300 !ring-2 !ring-orange-200"
//                           : ""
//                       }`,
//                     option: (state) =>
//                       `${state.isSelected ? "!bg-orange-500" : ""} ${
//                         state.isFocused ? "!bg-orange-100" : ""
//                       }`,
//                     menu: () => "!mt-1",
//                     dropdownIndicator: () => "text-gray-400",
//                     indicatorSeparator: () => "!bg-gray-300",
//                   }}
//                   required
//                 />
//               </div>

//               <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
//                 <button
//                   type="button"
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className={`px-6 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 transition-colors ${
//                     isSubmitting
//                       ? "bg-orange-400 cursor-not-allowed"
//                       : "bg-orange-500 hover:bg-orange-600"
//                   }`}
//                 >
//                   {isSubmitting ? (
//                     <span className="flex items-center justify-center">
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Creating...
//                     </span>
//                   ) : (
//                     "Create Sacco"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateSaccos;
