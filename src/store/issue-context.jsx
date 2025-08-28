import { createContext, useCallback, useState } from "react";
import {
  getAllOffices,
  getAllTopUps,
  getAllTopUpsByDate,
  getSaccoOffices,
  getSaccos,
  getServices,
  listAllIssues,
  listAllIssuesByDate,
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
    sacco: "",
    office: "",
    service: "",
    assigned_to: "",
    type: "",
    description: "",
    attachments: "",
  },
  issueDate: {
    startDate: "",
    endDate: "",
    sacco: "",
  },
  handleModal: () => {},
  submited: "",
  handleChange: () => {},
  handleIssueDateChange: () => {},
  handleClearForm: () => {},
  handleSubmitIssueForm: () => {},
  handleSubmitTopUpForm: () => {},
  fetchSaccos: () => {},
  fetchAllOffices: () => {},
  fetchOffices: () => {},
  fetchServices: () => {},
  fetchIssues: () => {},
  fetchResolvedIssues: () => {},
  fetchTopUpByDate: () => {},
  resolvedIssuesList: () => {},
  fetchUnResolvedIssues: () => {},
  fetchIssuesByDate: () => {},
  fetchResolvedIssuesByDate: () => {},
  fetchUnresolvedIssuesByDate: () => {},
  fetchTopUps: () => {},
  isSubmitingIssue: false,
  unResolvedIssuesList: [],
  saccoList: [],
  allOfficeList: [],
  officeList: [],
  serviceList: [],
  issuesList: [],
  topUpList: [],
  errMessage: "",
  message: "",
});

export default function ReportIssueContextProvider({ children }) {
  const [formData, setFormData] = useState({
    sacco: "",
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
  const [allOfficeList, setAllOfficeList] = useState([]);
  const [officeList, setOfficeList] = useState([]);
  const [loadingOffices, setLoadingOffices] = useState(false);
  const [saccoList, setSaccoList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [issuesList, setIssuesList] = useState([]);
  const [resolvedIssuesList, setResolvedIssuesList] = useState([]);
  const [unResolvedIssuesList, setUnResolvedIssuesList] = useState([]);
  const [topUpList, setTopUpList] = useState([]);
  const [isSubmitingIssue, setIsSubmittingIssue] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [message, setMessage] = useState("");

  const [issueDate, setIssueDate] = useState({
    startDate: "",
    endDate: "",
    sacco: "",
  });

  const fetchSaccos = useCallback(async () => {
    const saccos = await getSaccos();
    setSaccoList(saccos);
  }, []);

  const fetchAllOffices = useCallback(async () => {
    const allOffices = await getAllOffices();
    setAllOfficeList(allOffices);
  }, []);

  const fetchOffices = async (saccoId) => {
    if (!saccoId) {
      setOfficeList([]);
      return;
    }

    setLoadingOffices(true);
    try {
      const offices = await getSaccoOffices(saccoId);
      setOfficeList(offices);
    } catch (error) {
      console.error("Error fetching offices:", error);
      setOfficeList([]);
    } finally {
      setLoadingOffices(false);
    }
  };

  const fetchServices = useCallback(async () => {
    const services = await getServices();
    setServiceList(services);
  }, []);

  const fetchIssues = useCallback(async () => {
    const issues = await listAllIssues();
    setIssuesList(issues.data);
  }, []);

  const fetchResolvedIssues = useCallback(async () => {
    const resolvedIssues = await listResolvedIssues();
    setResolvedIssuesList(resolvedIssues.data);
  }, []);

  function handleIssueDateChange(event) {
    const { name, value } = event.target;

    if (name === "sacco") {
      const selectedSacco = saccoList.find((sacco) => sacco.name === value);
      setIssueDate((prevState) => {
        return {
          ...prevState,
          sacco: selectedSacco?.id || "",
          saccoName: value,
        };
      });
      console.log(issueDate);
    } else {
      setIssueDate((prevState) => ({ ...prevState, [name]: value }));
    }
    console.log(issueDate);
  }

  const fetchIssuesByDate = useCallback(async () => {
    const issues = await listAllIssuesByDate(issueDate);
    setIssuesList(issues.data);
  }, [issueDate]);

  const fetchResolvedIssuesByDate = useCallback(async () => {
    const resolvedIssues = await listResolvedIssuesByDate(issueDate);
    setResolvedIssuesList(resolvedIssues.data);
  }, [issueDate]);

  const fetchUnresolvedIssuesByDate = useCallback(async () => {
    const resolvedIssues = await listUnResolvedIssuesByDate(issueDate);
    setUnResolvedIssuesList(resolvedIssues.data);
  }, [issueDate]);

  const fetchUnResolvedIssues = useCallback(async () => {
    const unResolvedIssues = await listUnResolvedIssues();
    console.log(unResolvedIssues);
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
    if (name === "sacco") {
      const selectedSacco = saccoList.find((sacco) => sacco.name === value);
      setFormData((prevState) => {
        return {
          ...prevState,
          sacco: selectedSacco?.id || "",
          saccoName: value,
          office: "", // Reset office when sacco changes
          officeName: "", // Reset office name when sacco changes
        };
      });

      // Fetch offices for the selected sacco
      if (selectedSacco?.id) {
        fetchOffices(selectedSacco.id);
      } else {
        setOfficeList([]);
      }
    } else if (name === "service") {
      const selectedService = serviceList.find(
        (service) => service.name === value
      );
      setFormData((prev) => ({
        ...prev,
        service: selectedService?.id || "",
        serviceName: value,
      }));
    } else if (name === "office") {
      // Find office in the officeList (not saccoList!)
      const selectedOffice = officeList.find(
        (office) => office.name === value // or office.id === value, depending on your structure
      );

      setFormData((prev) => ({
        ...prev,
        office: selectedOffice?.id || "",
        officeName: value,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    console.log(formData);
  }

  function handleClearForm() {
    setFormData({
      sacco: "",
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
    setMessage("");
    setErrMessage("");
    setFormData({
      sacco: "",
      office: "",
      service: "",
      assigned_to: "",
      type: "",
      description: "",
      date: "",
      sim_number: "",
      amount: "",
      attachments: "",
      status: "unsolved",
    });
    // navigate("/landing");
  }

  const updateAttachments = (files) => {
    setFormData((prev) => ({
      ...prev,
      attachments: files,
    }));
  };

  async function handleSubmitIssueForm(event) {
    event.preventDefault();
    setIsSubmittingIssue(true);
    try {
      const formPayload = new FormData();

      // Append all regular form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "attachments" && value !== undefined && value !== null) {
          formPayload.append(key, value);
        }
      });

      // Process and append files with truncated names
      if (Array.isArray(formData.attachments)) {
        formData.attachments.forEach((file) => {
          // Truncate filename if too long (keeping extension)
          let processedFile = file;
          if (file.name.length > 100) {
            const ext = file.name.split(".").pop();
            const nameWithoutExt = file.name.slice(0, -(ext.length + 1));
            const truncatedName =
              nameWithoutExt.slice(0, 95 - ext.length) + "." + ext;
            processedFile = new File([file], truncatedName, {
              type: file.type,
            });
          }
          formPayload.append("attachments", processedFile);
        });
      }

      const response = await reportIssue(formPayload);
      if (response.status >= 200 && response.status < 300) {
        setMessage("Issue submitted successfully!");
      }
      if (response.status === 400) {
        setErrMessage("Failed to submit issue.Try Again!!");
      }
      if (response.status === 500) {
        setErrMessage("Failed to submit issue.Internal server error!!");
      }
      const resData = await response.json();
      setSubmited(true);
      return resData;
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmited(false);
      throw error;
    } finally {
      setIsSubmittingIssue(false);
    }
  }

  async function handleSubmitTopUpForm(event) {
    event.preventDefault();
    setIsSubmittingIssue(true);
    try {
      const response = await updateTopUp(formData);

      if (response.status >= 200 && response.status < 300) {
        setMessage("Top-up updated successfully!");
      }
      if (response.status === 400) {
        setErrMessage("Failed to update top up.Try Again!!");
      }
      if (response.status === 500) {
        setErrMessage("Failed to update top up.Internal server error!!");
      }
      const resData = await response.json();
      setSubmited(true);
      return resData;
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmited(false);
      throw error;
    } finally {
      setIsSubmittingIssue(false);
    }
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
    isSubmitingIssue: isSubmitingIssue,
    submited: submited,
    fetchSaccos: fetchSaccos,
    fetchAllOffices: fetchAllOffices,
    fetchOffices: fetchOffices,
    fetchServices: fetchServices,
    fetchIssues: fetchIssues,
    fetchResolvedIssues: fetchResolvedIssues,
    fetchUnResolvedIssues: fetchUnResolvedIssues,
    fetchIssuesByDate: fetchIssuesByDate,
    fetchResolvedIssuesByDate: fetchResolvedIssuesByDate,
    fetchUnresolvedIssuesByDate: fetchUnresolvedIssuesByDate,
    fetchTopUps: fetchTopUps,
    fetchTopUpByDate: fetchTopUpByDate,
    topUpList: topUpList,
    resolvedIssuesList: resolvedIssuesList,
    unResolvedIssuesList: unResolvedIssuesList,
    saccoList: saccoList,
    allOfficeList: allOfficeList,
    officeList: officeList, //to be added
    loadingOffices: loadingOffices,
    serviceList: serviceList,
    issuesList: issuesList,
    errMessage: errMessage,
    message: message,
    updateAttachments: updateAttachments,
  };

  return (
    <IssueContext.Provider value={ctxValue}>{children}</IssueContext.Provider>
  );
}
