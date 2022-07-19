import React from 'react';
import axios from "axios";
import {EmployeeDataWithId} from "../App";

interface EmployeePropsData {
    editFormData : EmployeeDataWithId;

    handleEditFormChange :(event:React.FormEvent<HTMLInputElement>) => void;
    
    handleCancelClick : () => void;
}

const EditableRow:React.FC<EmployeePropsData> = props => {
  
    const handleUpdate = () => {
       axios.put(`http://localhost:3000/employee/${props.editFormData._id}`,props.editFormData).then(() => {
        window.location.reload()
       })
    }
  
    return (
      <tr>
        <td>
          <input
            type="text"
            placeholder="Enter a name..."
            name="name"
            value={props.editFormData.name}
            onChange={(event) => props.handleEditFormChange(event)}
            required
          ></input>
        </td>
        <td>
          <input
            type="email"
            placeholder="Enter email..."
            name="email"
            value={props.editFormData.email}
            onChange={(event)=>props.handleEditFormChange(event)}
            required
          ></input>
        </td>
        <td>
          <input
            type="text"
            placeholder="Enter a phone number..."
            name="phone"
            value={props.editFormData.phone}
            onChange={(event) => props.handleEditFormChange(event)}
            required
          ></input>
        </td>
        <td>
          <input
            type="text"
            placeholder="Enter salary..."
            name="salary"
            value={props.editFormData.salary}
            onChange={(event) => props.handleEditFormChange(event)}
            required
          ></input>
        </td>
        <td>
          <input
            type="text"
            placeholder="Enter date of joining..."
            name="doj"
            value={props.editFormData.doj}
            onChange={(event) => props.handleEditFormChange(event)}
            required
          ></input>
        </td>
        
        <td>
          <button type="submit" onClick={() => handleUpdate}>Save</button>
          <button type="button" onClick={() => props.handleCancelClick()}>
            Cancel
          </button>
        </td>
      </tr>
    );
  };

export default EditableRow