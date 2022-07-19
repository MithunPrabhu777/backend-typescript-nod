import React from 'react';
import {EmployeeDataWithId} from "../App";

interface FormValuesWithId {
    employee : EmployeeDataWithId;

    handleEditClick : (event:any,employee : EmployeeDataWithId) => void;
    
    handleDeleteClick: (event: string) => void;
}

const ReadOnlyRow:React.FC<FormValuesWithId> = props => {

    return (
      <tr>
        <td>{props.employee.name}</td>
        <td>{props.employee.email}</td>
        <td>{props.employee.phone}</td>
        <td>{props.employee.salary}</td>
        <td>{props.employee.doj}</td>
        <td>
          <button
            type="button"
            style={{backgroundColor:"black",color:"white",cursor:"pointer"}}
            onClick={(event) => props.handleEditClick(event,props.employee)}
          >
            Edit
          </button>
          <button type="button"  style={{backgroundColor:"black",color:"white",cursor:"pointer"}} onClick={()=>props.handleDeleteClick(props.employee._id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  };

export default ReadOnlyRow;