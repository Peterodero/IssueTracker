import { Fragment, useContext, useEffect, useState } from "react";
import { authFetch, createOffices, url } from "../../util/http";
import Modal from "../UI/Modal";
import CreateOffices from "./CreateOffices";
import LoadingIndicator from "../UI/LoadingIndicator";
import { IssueContext } from "../../store/issue-context";

export default function Offices() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [isAddingOffice, setIsAddingOffice] = useState(false);

  const {allOfficeList, fetchAllOffices} = useContext(IssueContext)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await fetchAllOffices();
        } catch (error) {
        console.error("Error loading offices:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchAllOffices]);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData(value);
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrMessage("");
    setMessage("");

    console.log(formData);

    try {
      const response = await createOffices({ name: formData });
      console.log(response.status);
      if (response.status >= 200 && response.status < 300) {
        setMessage("Office creation successful!");
      }
      const data = await response.json();
      console.log(data);
      if (response.status === 400) {
        setErrMessage(data.errors?.name?.[0]);
      }
      // setMessage("Office creation successful!");
    } catch (error) {
      setErrMessage("Failed to create office. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async() => {
    await fetchAllOffices()
    setMessage("");
    setErrMessage("");
    setFormData("");
    setIsAddingOffice(false);
  };

  const handleAddOffice = () => {
    setIsAddingOffice(true);
  };

  const handleDeleteOffice = async (id) => {
    const response = await authFetch(url + "/offices/delete/", {
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
    await fetchAllOffices();
    setLoading(false);
    return resData;
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
      <div className="mb-4 p-4 rounded-md bg-green-100 text-gray-500 border border-red-200">
        {message}
      </div>
    );
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  const role = sessionStorage.getItem("role");

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center border-b-2 border-orange-300 mb-6  ">
        <div></div>
        <h2 className="text-2xl text-center font-bold text-black mb-4">
          All Offices
        </h2>
        <button
          className="text-center border-2 border-orange-300 rounded mb-4 bg-white p-3 hover:bg-orange-300 hover:text-white"
          onClick={handleAddOffice}
        >
          Add Office
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
                  Office
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allOfficeList.map((office, index) => {
                const officeName = office?.name || "No office";

                return (
                  <Fragment key={office.id}>
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
                            {officeName}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-2 py-4 whitespace-nowrap space-x-2">
                        {role === "admin" && (
                          <button
                            onClick={() => handleDeleteOffice(office.id)}
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

      {isAddingOffice && (
        <Modal>
          <CreateOffices
            content={content}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            formData={formData}
            handleChange={handleChange}
          />
        </Modal>
      )}

      {allOfficeList.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No Offices found</p>
        </div>
      )}
    </div>
  );
}
