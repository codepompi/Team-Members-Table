import React, { useState } from "react";
import "./TableComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const TableComponent = ({ data, onDeleteRow }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleSelectRow = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

  const toggleSelectAll = () => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.length === data.length ? [] : data.map((item) => item.id)
    );
  };

  const handleDeleteRow = (id) => {
    onDeleteRow(id);
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.filter((rowId) => rowId !== id)
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectedRows.length === data.length}
              onChange={toggleSelectAll}
            />
          </th>
          <th>Name</th>
          <th>Company</th>
          <th>Status</th>
          <th>Last Updates</th>
          <th>Notes</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>
              <input
                type="checkbox"
                checked={selectedRows.includes(item.id)}
                onChange={() => toggleSelectRow(item.id)}
              />
            </td>
            <td>{item.name}</td>
            <td>{item.company}</td>
            <td>{item.status}</td>
            <td>{item.lastUpdates}</td>
            <td>{item.notes}</td>
            <td>
              <FontAwesomeIcon
                icon={faTrash}
                className="delete-icon"
                onClick={() => handleDeleteRow(item.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
