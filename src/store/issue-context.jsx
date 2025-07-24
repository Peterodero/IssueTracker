import { createContext, useState } from "react";

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

  function handleSubmitForm(event) {
    event.preventDefault();
    setDefaultData((prevState) => [formData, ...prevState]);
    console.log(defaultData);
  }

  const ctxValue = {
    formData: formData,
    handleChange: handleChange,
    handleClearForm: handleClearForm,
    handleSubmitForm: handleSubmitForm,
    defaultData: defaultData
  };

  return (
    <IssueContext.Provider value={ctxValue}>{children}</IssueContext.Provider>
  );
}
