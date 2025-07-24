import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const IssueContext = createContext({
  formData: {
    office: "",
    service: "",
    type: "",
    description: "",
    attachments: [],
  },
  defaultData: [],
  handleModal: ()=> {},
  submited: "",
  handleChange: () => {},
  handleClearForm: () => {},
  handleSubmitForm: () => {},
});

export default function ReportIssueContextProvider({ children }) {
  const [formData, setFormData] = useState({
    office: "",
    service: "",
    type: "",
    urgency: 3,
    description: "",
    attachments: [],
  });

  const [defaultData, setDefaultData] = useState([]);
  const [submited, setSubmited] = useState(false);

  const navigate = useNavigate();

  function handleChange(event) {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleClearForm() {
    setFormData({
      office: "",
      service: "",
      type: "",
      urgency: 3,
      description: "",
      attachments: [],
    });
  }

  function handleModal(){
    setSubmited(false)
     setFormData({
      office: "",
      service: "",
      type: "",
      urgency: 3,
      description: "",
      attachments: [],
    });
    navigate('/landing')

  }

  function handleSubmitForm(event) {
    event.preventDefault();
    setDefaultData((prevState) => [formData, ...prevState]);
    console.log(defaultData);
    //API
     setSubmited(true)
  }

  const ctxValue = {
    formData: formData,
    handleChange: handleChange,
    handleClearForm: handleClearForm,
    handleSubmitForm: handleSubmitForm,
    defaultData: defaultData,
    handleModal: handleModal,
    submited: submited
  };

  return (
    <IssueContext.Provider value={ctxValue}>{children}</IssueContext.Provider>
  );
}
