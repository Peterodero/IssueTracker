import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IssueContext } from "../../store/issue-context";
import TopUpForm from "../airtimeTopUp/TopUpForm";

const UpdateTopUp = () => {
  const navigate = useNavigate();

  const { formData, fetchSaccos, fetchServices, handleSubmitTopUpForm } = useContext(IssueContext);

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
    
    await handleSubmitTopUpForm(e)
    
    if (validateForm()) {
      alert("Top-up updated successfully!");
      navigate("/landing/resolveTopUp");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mb-3 mx-auto bg-white rounded-xl shadow-md overflow-hidden p-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Update Airtime Top-Up
        </h2>
      </div>
      <TopUpForm handleSubmit={handleSubmit} errors={errors}/>
    </div>
  );
};

export default UpdateTopUp;
