import { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getOffices,
  getServices,
  listAllIssues,
  reportIssue,
} from "../util/http";

// eslint-disable-next-line react-refresh/only-export-components
export const IssueContext = createContext({
  formData: {
    office: "",
    service: "",
    type: "",
    description: "",
    attachments: [],
  },
  handleModal: () => {},
  submited: "",
  handleChange: () => {},
  handleClearForm: () => {},
  handleSubmitIssueForm: () => {},
  fetchOffices: () => {},
  fetchServices: () => {},
  fetchIssues: () => {},
  officeList: [],
  serviceList: [],
  issuesList: [],
});

export default function ReportIssueContextProvider({ children }) {
  const [formData, setFormData] = useState({
    office: "",
    service: "",
    type: "",
    description: "",
  });

  const [submited, setSubmited] = useState(false);

  const [officeList, setOfficeList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [issuesList, setIssuesList] = useState([]);

  const navigate = useNavigate();

  const fetchOffices = useCallback(async () => {
    const offices = await getOffices();
    setOfficeList(offices);
    console.log(offices);
  }, []);

  const fetchServices = useCallback(async () => {
    const services = await getServices();
    setServiceList(services);
    console.log(services);
  }, []);

  const fetchIssues = useCallback(async () => {
    const issues = await listAllIssues();
    setIssuesList(issues);
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "office") {
      const selectedOffice = officeList.find((office) => office.name === value);

      console.log(selectedOffice.id);

      setFormData((prevState) => {
        return {
          ...prevState,
          office: selectedOffice?.id || "",
          officeName: value,
        };
      });
    } else if (name === "service") {
      const selectedService = serviceList.find(
        (service) => service.name === value
      );

      setFormData((prev) => ({
        ...prev,
        service: selectedService?.id || "",
        serviceName: value,
      }));
    } else {
      // Handle other fields normally
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleClearForm() {
    setFormData({
      office: "",
      service: "",
      type: "",
      description: "",
      attachments: [],
    });
  }

  function handleModal() {
    setSubmited(false);
    setFormData({
      office: "",
      service: "",
      type: "",
      description: "",
      status: "unsolved",
      attachments: [],
    });
    navigate("/landing");
  }

  function handleSubmitIssueForm(event) {
    event.preventDefault();

    reportIssue(formData);

    setSubmited(true);
  }

  const ctxValue = {
    formData: formData,
    handleChange: handleChange,
    handleClearForm: handleClearForm,
    handleSubmitIssueForm: handleSubmitIssueForm,
    handleModal: handleModal,
    submited: submited,
    fetchOffices: fetchOffices,
    fetchServices: fetchServices,
    fetchIssues: fetchIssues,
    officeList: officeList,
    serviceList: serviceList,
    issuesList: issuesList,
  };

  return (
    <IssueContext.Provider value={ctxValue}>{children}</IssueContext.Provider>
  );
}
