# Update context like this
const [officeList, setOfficeList] = useState([]);
const [loadingOffices, setLoadingOffices] = useState(false);

const fetchOffices = async (saccoId) => {
  if (!saccoId) {
    setOfficeList([]);
    return;
  }

  setLoadingOffices(true);
  try {
    const response = await fetch(`/api/saccos/${saccoId}/offices`);
    if (!response.ok) throw new Error('Failed to fetch offices');
    const offices = await response.json();
    setOfficeList(offices);
  } catch (error) {
    console.error('Error fetching offices:', error);
    setOfficeList([]);
  } finally {
    setLoadingOffices(false);
  }
};

// Add these to your context value
value={{
  // ... existing values
  officeList,
  loadingOffices,
  fetchOffices,
}}

# Change the handlechange fxn
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
    
  } else if (name === 'office') {
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
}

# Update you component like this

{issueCtx.formData.sacco && (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Select Office<span className="text-red-500">*</span>
    </label>
    <Select
      options={issueCtx.officeList.map((office) => ({
        value: office.id, // Use office ID
        label: office.name, // Use office name
      }))}
      value={
        issueCtx.formData.office
          ? {
              value: issueCtx.formData.office,
              label: issueCtx.formData.officeName || "Select an office",
            }
          : {
              value: "",
              label: "Select an office",
            }
      }
      onChange={(selectedOption) => {
        const selectedOffice = issueCtx.officeList.find(
          (office) => office.id === selectedOption.value
        );
        issueCtx.handleChange({
          target: {
            name: "office",
            value: selectedOffice?.name || selectedOption.value,
          },
        });
      }}
      placeholder={issueCtx.loadingOffices ? "Loading offices..." : "Type to search office..."}
      isDisabled={issueCtx.loadingOffices}
      isLoading={issueCtx.loadingOffices}
      className="w-full"
      classNames={{
        control: (state) =>
          `min-h-[42px] border border-gray-300 ${
            state.isFocused
              ? "!border-orange-300 !ring-2 !ring-orange-200"
              : ""
          }`,
        option: (state) =>
          `${state.isSelected ? "!bg-orange-500" : ""} ${
            state.isFocused ? "!bg-orange-100" : ""
          }`,
        menu: () => "!mt-1",
        dropdownIndicator: () => "text-gray-400",
        indicatorSeparator: () => "!bg-gray-300",
      }}
      required
    />
  </div>
)}