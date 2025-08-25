import { Fragment, useContext, useEffect, useState } from "react";
import { IssueContext } from "../../store/issue-context";
import { authFetch, getAllOffices } from "../../util/http";
import Modal from "../UI/Modal";
import CreateSaccos from "./CreateSacco";
import LoadingIndicator from "../UI/LoadingIndicator";

const url = "https://issue-tracker-jywg.onrender.com/api";

export default function Saccos() {
  const { fetchSaccos, saccoList } = useContext(IssueContext);

  const [loading, setLoading] = useState(false);
  const [isAddingSacco, setIsAddingSacco] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    office: "",
  });
  const [offices, setOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(null); // For React Select value
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await fetchSaccos();
        // Ensure offices is an array of objects with id and name
      } catch (error) {
        console.error("Error loading offices:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchSaccos]);

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

  async function handleDeleteSacco(id) {
    const response = await authFetch(url + "/saccos/delete/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete sacco");
    }

    const resData = await response.json();

    setLoading(true);
    await fetchSaccos();
    setLoading(false);
    return resData;
  }

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
        setMessage("Sacco creation successful!");
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

  const handleCancel = async () => {

    await fetchSaccos()
    setMessage("");
    setErrMessage("");
    setFormData({
      name: "",
      office: "",
    });
    setIsAddingSacco(false);
    setIsSubmitting(false);
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

  function handleAddSacco() {
    setIsAddingSacco(true);
  }

  const role = sessionStorage.getItem("role");

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center border-b-2 border-orange-300 mb-6  ">
        <div></div>
        <h2 className="text-2xl text-center font-bold text-black pb-2">
          All Saccos
        </h2>
        <button
          className="text-center border-2 border-orange-300 rounded mb-5 bg-white p-3 hover:bg-orange-300 hover:text-white"
          onClick={handleAddSacco}
        >
          Add Sacco
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-orange-300">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Sacco
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Office
                </th>
                {/* <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Details
                </th> */}
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {saccoList.map((sacco, index) => {
                const saccoName = sacco?.name || "No sacco";
                const officeName = sacco.office?.name || "No office";

                return (
                  <Fragment key={sacco.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      {/* Index Number */}
                      <td className="px-2 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                            index % 2 === 0
                              ? "bg-orange-100 text-orange-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {index + 1}
                        </span>
                      </td>

                      {/* Office */}
                      <td className="px-2 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {saccoName}
                          </span>
                        </div>
                      </td>

                      <td className="px-2 py-4">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">
                            {officeName}
                          </span>
                        </div>
                      </td>

                      {/* <td className="px-2 py-4 whitespace-nowrap">
                        <Link
                          to={role === 'admin' ? `/admin/view-attachment/${issue.id}` : `/landing/view-attachment/${issue.id}`}
                          className="text-orange-500 hover:text-orange-700 font-medium"
                        >
                          View Details
                        </Link>
                      </td> */}

                      {/* Actions */}
                      <td className="px-2 py-4 whitespace-nowrap space-x-2">
                        {role === "admin" && (
                          <button
                            onClick={() => handleDeleteSacco(sacco.id)}
                            className="px-1 py-1 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isAddingSacco && (
        <Modal>
          <CreateSaccos
            content={content}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            formData={formData}
            handleChange={handleChange}
            offices={offices}
            selectedOffice={selectedOffice}
            handleOfficeChange={handleOfficeChange}
          />
        </Modal>
      )}

      {saccoList.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No Saccos found</p>
        </div>
      )}
    </div>
  );
}
