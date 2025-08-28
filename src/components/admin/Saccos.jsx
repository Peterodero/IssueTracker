import { Fragment, useContext, useEffect, useState } from "react";
import { IssueContext } from "../../store/issue-context";
import { authFetch, createOffices, getAllOffices } from "../../util/http";
import Modal from "../UI/Modal";
import CreateSaccos from "./CreateSacco";
import LoadingIndicator from "../UI/LoadingIndicator";
import { Link } from "react-router-dom";
import CreateOffices from "./CreateOffices";

const url = "https://issue-tracker-jywg.onrender.com/api";

export default function Saccos() {
  const { fetchSaccos, saccoList } = useContext(IssueContext);

  const [loading, setLoading] = useState(false);
  const [isAddingSacco, setIsAddingSacco] = useState(false);

  const [saccoFormData, setSaccoFormData] = useState("");
  const [officeFormData, setOfficeFormData] = useState("");
  const [offices, setOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(null); // For React Select value
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [isAddingOffice, setIsAddingOffice] = useState(false);
  const [saccoId, setSaccoId]  = useState("");

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

  const handleChangeSacco = (e) => {
    const { value } = e.target;
    setSaccoFormData(value);
    console.log(saccoFormData);
  };


  const handleChangeOffice = (e) => {
    const { value } = e.target;
    setOfficeFormData(value);
    console.log(officeFormData);
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
        setSaccoFormData("");
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

  const handleSubmitSacco = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrMessage("");
    setMessage("");

    try {
      await createSaccos(saccoFormData);
    } catch (error) {
      setErrMessage("Failed to add sacco. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitOffice = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setErrMessage("");
      setMessage("");
  
      console.log(officeFormData);
  
      try {
        const response = await createOffices({ name: officeFormData, saccoId: saccoId });
        console.log(response.status);
        if (response.status >= 200 && response.status < 300) {
          setMessage("Office creation successful!");
        }
        const data = await response.json();
        console.log(data);
        if (response.status === 400) {
          setErrMessage(data.errors?.non_field_errors?.[0]);
        }
        // setMessage("Office creation successful!");
      } catch (error) {
        setErrMessage("Failed to add an office. Please try again.");
        console.error("Submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    };
  

  const handleCancelSacco = async () => {
    await fetchSaccos();
    setMessage("");
    setErrMessage("");
    setSaccoFormData("");
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

  const handleCancelOffice = async() => {
    await fetchSaccos();
    setMessage("");
    setErrMessage("");
    setOfficeFormData("");
    setIsAddingOffice(false);
  };

  const handleAddSaccoOffice = (id) => {
    setSaccoId(id)
    setIsAddingOffice(true);
  };

  const role = sessionStorage.getItem("role");

  if (loading) {
    return <LoadingIndicator />;
  }

  console.log(saccoList)

  return (
    <div className="min-h-screen bg-white py-6 px-30">
      <div className="flex justify-between items-center border-b-2 border-orange-300 mb-6  ">
        <div></div>
        <h2 className="text-2xl text-center font-bold text-black mb-2">
          All Saccos
        </h2>
        <button
          className="text-center hover:border border hover:border-orange-300 border-orange-300 rounded mb-4 hover:bg-white p-3 bg-orange-300 hover:text-black"
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
                  No. of Offices
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Details
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {saccoList.map((sacco, index) => {
                const saccoName = sacco?.name || "No sacco";
                const officeName = sacco.offices?.length || "0";

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

                      <td className="px-2 py-4 whitespace-nowrap">
                        <Link
                          to={
                            role === "admin" && `/admin/sacco-details/${sacco.id}`
                          }
                          state={{ sacco }} 
                          className="text-orange-500 hover:text-orange-700 font-medium"
                        >
                          View Details
                        </Link>
                      </td>

                      {/* Actions */}
                      <td className="px-2 py-4 whitespace-nowrap space-x-2 justify-center">
                        {role === "admin" && (
                          <div className="flex gap-3 justify-center">
                            <button
                              onClick={() => handleAddSaccoOffice(sacco.id)}
                              className="px-4 py-1 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                              Add Office
                            </button>
                            <button
                              onClick={() => handleDeleteSacco(sacco.id)}
                              className="px-4 py-1 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                              Delete
                            </button>
                          </div>
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
            handleSubmit={handleSubmitSacco}
            handleCancel={handleCancelSacco}
            formData={saccoFormData}
            handleChange={handleChangeSacco}
            offices={offices}
            selectedOffice={selectedOffice}
            // handleOfficeChange={handleOfficeChange}
          />
        </Modal>
      )}

      {isAddingOffice && (
        <Modal>
          <CreateOffices
            content={content}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmitOffice}
            handleCancel={handleCancelOffice}
            formData={officeFormData}
            handleChange={handleChangeOffice}
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
