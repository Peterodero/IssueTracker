import { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllTopUps,
  getAllTopUpsByDate,
  getOffices,
  getServices,
  listAllIssues,
  listResolvedIssues,
  listResolvedIssuesByDate,
  listUnResolvedIssues,
  listUnResolvedIssuesByDate,
  reportIssue,
  updateTopUp,
} from "../util/http";

// eslint-disable-next-line react-refresh/only-export-components
export const IssueContext = createContext({
  formData: {
    office: "",
    service: "",
    assigned_to: "",
    type: "",
    description: "",
    attachments: "",
  },
  issueDate: {
    startDate: "",
    endDate: ""
  },
  handleModal: () => {},
  submited: "",
  handleChange: () => {},
  handleIssueDateChange: ()=>{},
  handleClearForm: () => {},
  handleSubmitIssueForm: () => {},
  handleSubmitTopUpForm: () => {},
  fetchOffices: () => {},
  fetchServices: () => {},
  fetchIssues: () => {},
  fetchResolvedIssues: () => {},
  fetchTopUpByDate: ()=>{},
  resolvedIssuesList: () => {},
  fetchUnResolvedIssues: () => {},
  fetchResolvedIssuesByDate: ()=>{},
  fetchUnresolvedIssuesByDate: ()=>{},
  fetchTopUps: () => {},
  unResolvedIssuesList: [],
  officeList: [],
  serviceList: [],
  issuesList: [],
  topUpList: [],
});

export default function ReportIssueContextProvider({ children }) {
  const [formData, setFormData] = useState({
    office: "",
    service: "",
    assigned_to: "",
    type: "",
    description: "",
    date: "",
    sim_number: "",
    amount: "",
    attachments: "",
  });

  const [submited, setSubmited] = useState(false);

  const [officeList, setOfficeList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [issuesList, setIssuesList] = useState([]);
  const [resolvedIssuesList, setResolvedIssuesList] = useState([]);
  const [unResolvedIssuesList, setUnResolvedIssuesList] = useState([]);
  const [topUpList, setTopUpList] = useState([]);

  const [issueDate, setIssueDate] = useState({
    startDate: "",
    endDate: ""
  })

  const navigate = useNavigate();

  const fetchOffices = useCallback(async () => {
    const offices = await getOffices();
    setOfficeList(offices);
    // console.log(offices);
  }, []);

  const fetchServices = useCallback(async () => {
    const services = await getServices();
    setServiceList(services);
    // console.log(services);
  }, []);

  const fetchIssues = useCallback(async () => {
    const issues = await listAllIssues();
    // console.log(issues.data);
    setIssuesList(issues.data);
  }, []);

  const fetchResolvedIssues = useCallback(async () => {
    const resolvedIssues = await listResolvedIssues();
    // console.log(resolvedIssues);
    setResolvedIssuesList(resolvedIssues.data);
  }, []);

  function handleIssueDateChange(event){
    setIssueDate((prevState)=> {
      return {
        ...prevState,
        [event.target.name] : event.target.value
      }
    })

  }

    const fetchResolvedIssuesByDate = useCallback(async () => {
    const resolvedIssues = await listResolvedIssuesByDate(issueDate);
    setResolvedIssuesList(resolvedIssues.data);
  }, [issueDate]);

    const fetchUnresolvedIssuesByDate = useCallback(async () => {
    const resolvedIssues = await listUnResolvedIssuesByDate(issueDate);
    console.log(resolvedIssues);
    setUnResolvedIssuesList(resolvedIssues.data);
  }, [issueDate]);

  const fetchUnResolvedIssues = useCallback(async () => {
    const unResolvedIssues = await listUnResolvedIssues();
    setUnResolvedIssuesList(unResolvedIssues.data);
  }, []);

  const fetchTopUps = useCallback(async () => {
    const allTopUps = await getAllTopUps();
    setTopUpList(allTopUps);
  }, []);

   const fetchTopUpByDate = useCallback(async () => {
    const filteredTopUps = await getAllTopUpsByDate(issueDate);
    setTopUpList(filteredTopUps);
  }, [issueDate]);

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "office") {
      const selectedOffice = officeList.find((office) => office.name === value);

      // console.log(selectedOffice.id);

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
      attachments: "",
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
      attachments: "",
    });
    navigate("/landing");
  }

  const updateAttachments = (files) => {
    setFormData((prev) => ({
      ...prev,
      attachments: files,
    }));
  };

  async function handleSubmitIssueForm(event) {
  event.preventDefault();
  
  try {
    const formPayload = new FormData();

    // Append all regular form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'attachments' && value !== undefined && value !== null) {
        formPayload.append(key, value);
      }
    });

    // Process and append files with truncated names
    if (Array.isArray(formData.attachments)) {
      formData.attachments.forEach(file => {
        // Truncate filename if too long (keeping extension)
        let processedFile = file;
        if (file.name.length > 100) {
          const ext = file.name.split('.').pop();
          const nameWithoutExt = file.name.slice(0, -(ext.length + 1));
          const truncatedName = nameWithoutExt.slice(0, 95 - ext.length) + '.' + ext;
          processedFile = new File([file], truncatedName, { type: file.type });
        }
        formPayload.append('attachments', processedFile);
      });
    }

    const response = await reportIssue(formPayload);
    setSubmited(true);
    return response;
  } catch (error) {
    console.error('Submission failed:', error);
    setSubmited(false);
    throw error;
  }
}

  async function handleSubmitTopUpForm(event) {
    event.preventDefault();
    console.log(formData);
    await updateTopUp(formData);
  }

  const ctxValue = {
    formData: formData,
    issueDate: issueDate,
    handleChange: handleChange,
    handleIssueDateChange: handleIssueDateChange,
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
    fetchResolvedIssuesByDate: fetchResolvedIssuesByDate,
    fetchUnresolvedIssuesByDate:fetchUnresolvedIssuesByDate,
    fetchTopUps: fetchTopUps,
    fetchTopUpByDate: fetchTopUpByDate,
    topUpList: topUpList,
    resolvedIssuesList: resolvedIssuesList,
    unResolvedIssuesList: unResolvedIssuesList,
    officeList: officeList,
    serviceList: serviceList,
    issuesList: issuesList,
    updateAttachments: updateAttachments,
  };

  return (
    <IssueContext.Provider value={ctxValue}>{children}</IssueContext.Provider>
  );
}
