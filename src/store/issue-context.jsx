import { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllTopUps,
  getOffices,
  getServices,
  listAllIssues,
  listResolvedIssues,
  listUnResolvedIssues,
  reportIssue,
  updateTopUp,
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
  handleSubmitTopUpForm: () => {},
  fetchOffices: () => {},
  fetchServices: () => {},
  fetchIssues: () => {},
  fetchResolvedIssues: () => {},
  resolvedIssuesList: () => {},
  fetchUnResolvedIssues: () => {},
  fetchTopUps: ()=> {},
  unResolvedIssuesList: [],
  officeList: [],
  serviceList: [],
  issuesList: [],
  topUpList: []
});

export default function ReportIssueContextProvider({ children }) {
  const [formData, setFormData] = useState({
    office: "",
    service: "",
    type: "",
    description: "",
    date: "",
    sim_number: "",
    amount: "",
    attachments: [],
  });

  const [submited, setSubmited] = useState(false);

  const [officeList, setOfficeList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [issuesList, setIssuesList] = useState([]);
  const [resolvedIssuesList, setResolvedIssuesList] = useState([]);
  const [unResolvedIssuesList, setUnResolvedIssuesList] = useState([]);
  const [topUpList, setTopUpList] = useState([])

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
    console.log(issues.data);
    setIssuesList(issues.data);
  }, []);

  const fetchResolvedIssues = useCallback(async () => {
    const resolvedIssues = await listResolvedIssues();
    console.log(resolvedIssues)
    setResolvedIssuesList(resolvedIssues.data);
  }, []);

  const fetchUnResolvedIssues = useCallback(async () => {
    const unResolvedIssues = await listUnResolvedIssues();
    setUnResolvedIssuesList(unResolvedIssues.data);
  }, []);

  const fetchTopUps  = useCallback(async ()=>{
    const allTopUps = await getAllTopUps();
    setTopUpList(allTopUps);
    
  }, [])

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
      date: "",
      sim_number: "",
      amount: "",
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

  async function handleSubmitTopUpForm(event) {
    event.preventDefault();
    console.log(formData);
    await updateTopUp(formData);
  }

  const ctxValue = {
    formData: formData,
    handleChange: handleChange,
    handleClearForm: handleClearForm,
    handleSubmitIssueForm: handleSubmitIssueForm,
    handleSubmitTopUpForm: handleSubmitTopUpForm,
    handleModal: handleModal,
    submited: submited,
    fetchOffices: fetchOffices,
    fetchServices: fetchServices,
    fetchIssues: fetchIssues,
    fetchResolvedIssues: fetchResolvedIssues,
    fetchUnResolvedIssues: fetchUnResolvedIssues,
    fetchTopUps: fetchTopUps,
    topUpList: topUpList,
    resolvedIssuesList: resolvedIssuesList,
    unResolvedIssuesList: unResolvedIssuesList,
    officeList: officeList,
    serviceList: serviceList,
    issuesList: issuesList,
  };

  return (
    <IssueContext.Provider value={ctxValue}>{children}</IssueContext.Provider>
  );
}
