import { useState, useEffect, useContext } from "react";
import { IssueContext } from "../../store/issue-context";
import TopUpForm from "../airtimeTopUp/TopUpForm";
import Modal from "../UI/Modal";

const UpdateTopUp = () => {

  const {
    formData,
    fetchSaccos,
    fetchServices,
    handleSubmitTopUpForm,
    handleModal,
    submited,
    errMessage,
    message,
  } = useContext(IssueContext);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchSaccos();
  }, [fetchSaccos]);

  useEffect(() => {
    fetchServices(formData.office);
  }, [formData.office, fetchServices]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.office) newErrors.office = "Office is required";
    if (!formData.service) newErrors.service = "Service is required";
    if (!formData.sim_number) newErrors.sim_number = "SIM number is required";
    if (!formData.amount || isNaN(formData.amount))
      newErrors.amount = "Valid amount is required";
    if (!formData.date) newErrors.date = "Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    await handleSubmitTopUpForm(e);

    validateForm()

    // if (validateForm()) {
    //   alert("Top-up updated successfully!");
    //   navigate("/landing/resolveTopUp");
    // }
  };

  let content;
  let cssClass;

  if (errMessage) {
    content = errMessage;
    cssClass = "bg-red-50 text-red-800 border border-red-200";
  }
  if (message) {
    content = message;
    cssClass = "bg-green-100 text-green-800 border border-green-200";
  }

  return (
    <>
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-3xl mb-3 mx-auto bg-white rounded-xl shadow-md overflow-hidden p-5">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Update Airtime Top-Up
          </h2>
        </div>
        <TopUpForm handleSubmit={handleSubmit} errors={errors} />
      </div>
      {submited && (
        <div className="flex items-center justify-center">
          <Modal>
            <div className={`mb-3 p-4 rounded-md ${cssClass}`}>
              <div className="mb-4 ">{content}</div>
              <div className="flex justify-between m-1">
                <div></div>
                <button
                  className="bg-orange-300 text-gray-500 align-super justify-end py-1 px-3 rounded"
                  onClick={handleModal}
                >
                  Okay
                </button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default UpdateTopUp;
