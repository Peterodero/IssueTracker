import { Fragment, useContext, useEffect, useState } from "react";
import { IssueContext } from "../../store/issue-context";
import { authFetch, url } from "../../util/http";
import Modal from "../UI/Modal";
import LoadingIndicator from "../UI/LoadingIndicator";
import CreateServices from "./CreateServices";


export default function Services() {
  const { fetchServices, serviceList } = useContext(IssueContext);

  const [loading, setLoading] = useState(false);
  const [isAddingService, setIsAddingService] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

   useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await fetchServices();
        } catch (error) {
        console.error("Error loading offices:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchServices]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  async function createServices(formData) {
    try {
      const response = await fetch(url + "/services/create/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.status >= 200 && response.status < 300) {
        setMessage("Service creation successful!");
      }
      if (response.status === 400) {
        setErrMessage(data.errors?.name?.[0]);
      }

      return data;
    } catch (error) {
      console.log(error.message);
    }
  }


    const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrMessage("")
    setIsSubmitting(true);

    try {
      await createServices(formData);
    } catch (error) {
      setErrMessage("Failed to create service. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  async function handleDeleteService(id) {
    const response = await authFetch(url + "/services/delete/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete service");
    }

    const resData = await response.json();

    setLoading(true);
    await fetchServices();
    setLoading(false);
    return resData;
  }

  const handleCancel = async () => {
    setIsAddingService(false);
    await fetchServices()
    setMessage("");
    setErrMessage("");
    setFormData({
      name: "",
      office: "",
    });
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

  function handleAddService() {
    setIsAddingService(true);
  }

  const role = sessionStorage.getItem("role");

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center border-b-2 border-orange-300 mb-6  ">
        <div></div>
        <h2 className="text-2xl text-center font-bold text-black mb-4">
          All Services
        </h2>
        <button
          className="text-center border-2 border-orange-300 rounded mb-4 bg-white p-3 hover:bg-orange-300 hover:text-white"
          onClick={handleAddService}
        >
          Add Service
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
                  Service
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Description
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
              {serviceList.map((service, index) => {
                const serviceName = service?.name || "No sacco";
                const description = service.description || "No Description"

                return (
                  <Fragment key={service.id}>
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
                            {serviceName}
                          </span>
                        </div>
                      </td>

                      <td className="px-2 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">
                            {description}
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
                            onClick={() => handleDeleteService(service.id)}
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

      {isAddingService && (
        <Modal>
          <CreateServices
            content={content}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            formData={formData}
            handleChange={handleChange}
          />
        </Modal>
      )}

      {serviceList.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No Services found</p>
        </div>
      )}
    </div>
  );
}
