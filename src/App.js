import React, { useState } from "react";
import "./App.css";
import TableComponent from "./TableComponent";
import Select, { components } from "react-select";

const initialData = [
  {
    id: 1,
    name: "Wayne Rooney",
    company: "DC United",
    status: "Active",
    lastUpdates: "07/07/2017",
    notes: "ManUtd Highest scorer",
  },
  {
    id: 2,
    name: "Ryan Giggs",
    company: "Manchester United",
    status: "Closed",
    lastUpdates: "03/08/2011",
    notes: "Most matches playaed",
  },
  {
    id: 3,
    name: "Zlatan Ibrahimovic",
    company: "LA Galaxy",
    status: "Active",
    lastUpdates: "03/09/2018",
    notes: "I am 'Zlatan'",
  },
];

const companyOptions = [
  { value: "DC United", label: "DC United" },
  { value: "Manchester United", label: "Manchester United" },
  { value: "LA Galaxy", label: "LA Galaxy" },
];

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Closed", label: "Closed" },
];

const { Option } = components;

const CheckboxOption = (props) => (
  <Option {...props}>
    <input
      type="checkbox"
      checked={props.isSelected}
      onChange={() => null}
      onClick={(e) => {
        props.selectOption(props.data);
      }}
    />
    {props.label}
  </Option>
);

function App() {
  const [data, setData] = useState(initialData);
  const [showPopup, setShowPopup] = useState(false);
  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    company: "",
    status: "",
    notes: "",
  });
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isSelectAllSelected, setIsSelectAllSelected] = useState(false);

  const handleDeleteRow = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleHidePopup = () => {
    setShowPopup(false);
    setNewTeamMember({
      name: "",
      company: "",
      status: "",
      notes: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTeamMember((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCompanyChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);

    if (selectedValues.includes("Select All")) {
      // Toggle the selection for "Select All" and all other options
      if (isSelectAllSelected) {
        setSelectedCompanies([]);
      } else {
        setSelectedCompanies(companyOptions);
      }
      setIsSelectAllSelected((prevState) => !prevState);
    } else {
      setSelectedCompanies(selectedOptions);
      setIsSelectAllSelected(false); // Unselect "Select All" if any other option is selected
    }
  };

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption);
  };

  // Get the sorted table data
  let sortedData = [...data];

  if (selectedCompanies.length > 0) {
    sortedData = sortedData.filter((item) =>
      selectedCompanies.some((company) => company.value === item.company)
    );
  }

  if (selectedStatus) {
    sortedData = sortedData.filter(
      (item) => selectedStatus.value === item.status
    );
  }

  const handleAddTeamMember = () => {
    setData((prevData) => [...prevData, { ...newTeamMember, id: Date.now() }]);
    handleHidePopup();
  };

  const handleClosePopup = () => {
    handleHidePopup();
  };

  return (
    <div className="App">
      <div className="header">
        <h1 className="heading">Team Members</h1>
        <button className="add-button" onClick={handleShowPopup}>
          Add Team Members +
        </button>
      </div>
      <hr />
      <div className="filter-section">
        <Select
          options={[
            { value: "Select All", label: "Select All" },
            ...companyOptions,
          ]}
          isMulti
          value={selectedCompanies}
          onChange={handleCompanyChange}
          components={{
            Option: CheckboxOption,
          }}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          controlShouldRenderValue={false}
          placeholder={`Company(${selectedCompanies.length})`}
        />
        <Select
          options={statusOptions}
          isMulti={false}
          value={selectedStatus}
          onChange={handleStatusChange}
          placeholder="Status"
        />
      </div>
      <TableComponent
        data={sortedData}
        onDeleteRow={handleDeleteRow}
        selectedCompanies={selectedCompanies}
      />
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2>Add Members </h2>
              <button className="close-button" onClick={handleClosePopup}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 7.485L14.243 1.242a1 1 0 011.415 1.415L9.414 8l6.244 6.243a1 1 0 11-1.415 1.415L8 9.415l-6.243 6.243a1 1 0 01-1.415-1.415L6.586 8 .343 1.757A1 1 0 111.758.343L8 7.586z"
                    fill="#333"
                  />
                </svg>
              </button>
            </div>

            <label>
              Name
              <input
                type="text"
                name="name"
                value={newTeamMember.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Company
              <input
                type="text"
                name="company"
                value={newTeamMember.company}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Status
              <input
                type="text"
                name="status"
                value={newTeamMember.status}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Notes
              <input
                type="text"
                name="notes"
                value={newTeamMember.notes}
                onChange={handleInputChange}
              />
            </label>
            <div className="popup-buttons">
              <button onClick={handleAddTeamMember}>Save</button>
              <button onClick={handleHidePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
