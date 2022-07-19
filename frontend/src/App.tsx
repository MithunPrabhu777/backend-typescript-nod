import React, { useState, Fragment, useEffect, FormEventHandler } from "react";
import logo from './logo.svg';
import axios from "axios";
import './App.css';
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

interface EmployeeCreateData {
    name: string,
    email: string,
    phone: number,
    salary: string,
    doj: string,
}

export interface EmployeeDataWithId  {
  _id:string,
  name: string,
  email: string,
  phone: number,
  salary: string,
  doj: string,
}

const  App:React.FC = () => {

  const [editEmployeeId, seteditEmployeeId] = useState(null);
  const [employeeData,setEmplooyeData] = useState([]);
  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    phone: null,
    salary: "",
    doj: "",
  });

  const [editFormData, setEditFormData] = useState({
    _id:"",
    name: "",
    email: "",
    phone: null,
    salary: "",
    doj: "",
  });

  // const [editEmployeeId, setEditEmployeeId] = useState(null);

  useEffect(() => {
    ListEmployees();
  },[]);

  async function  ListEmployees(){
    const data = await axios.get("http://localhost:3000/employee");
    
    setEmplooyeData(data.data.employee);
  }

  const handleAddFormChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    
    const fieldName = (event.target as HTMLInputElement).getAttribute("name");
    const fieldValue = (event.target as HTMLInputElement).value;

    const newFormData:any = { ...addFormData };
    newFormData[fieldName]  = fieldValue;

    setAddFormData(newFormData);

  };

  const  handleEditFormChange = (event:React.FormEvent<HTMLInputElement>) => {

    const fieldName = (event.target as HTMLInputElement).getAttribute("name");;
    const fieldValue = (event.target as HTMLInputElement).value;

    const newFormData:any = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    
    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    
    const newEmployee:EmployeeCreateData = {
      name: addFormData.name,
      email: addFormData.email,
      phone: addFormData.phone,
      salary: addFormData.salary,
      doj: addFormData.doj,
    };

    axios.post("http://localhost:3000/employee",newEmployee).then((res) => {
        if(res.status === 201){
          const newEmployees: Object[] = [...employeeData, newEmployee];
          setEmplooyeData(newEmployees);
          ListEmployees();
          window.location.reload();
        }
    }).catch((er) => {
        return er;
    });
  };

  const handleEditFormSubmit = (event:React.SyntheticEvent) => {
    event.preventDefault();

    const editedEmployee:EmployeeDataWithId = {
      _id: editFormData._id,
      name: editFormData.name,
      phone: parseInt(editFormData.phone),
      email:editFormData.email,
      salary: editFormData.salary,
      doj: editFormData.doj,
    };

    const newEmployees = [...employeeData];

    const index = employeeData.findIndex((employee) => employee._id === editEmployeeId._id);

    newEmployees[index] = editedEmployee;

    axios.put(`http://localhost:3000/employee/${editedEmployee._id}`,editedEmployee).then((res) => {
      if(res.status === 200){
        ListEmployees();
      }
  }).catch((er) => {
      return er;
  });

  seteditEmployeeId(null);
  };

  const handleEditClick = (event:React.FormEvent<HTMLInputElement>,employee:EmployeeDataWithId) => {
    event.preventDefault();
    seteditEmployeeId(employee._id);

    const formValues:EmployeeDataWithId = {
      _id : employee._id,
       name: employee.name,
       email:employee.email,
      phone: employee.phone,
      salary: employee.salary,
      doj: employee.doj,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = ()  => {
    seteditEmployeeId(null);
  };

  const handleDeleteClick = (event: string) => {

    const newEmployees = [...employeeData];
    axios.delete(`http://localhost:3000/employee/${event}`);
    const index = employeeData.findIndex((employee) => employee._id === event);

    newEmployees.splice(index, 1);

    setEmplooyeData(newEmployees);
  };

  return (
    <div className="app-container" style={{backgroundColor:"#34568b",minHeight:"94.5vh"}}>
       <h1 style={{color:"white"}}><img src="https://www.freecodecamp.org/news/content/images/2022/06/crud.png" style={{"height":"45px",borderRadius:"6px"}}/></h1>
      <form onSubmit={(event) => handleEditFormSubmit(event)}>
        <table>
          <thead>
            <tr>
              <th className="color-tr">Name</th>
              <th className="color-tr">Email</th>
              <th className="color-tr">Phone Number</th>
              <th className="color-tr">Salary</th>
              <th className="color-tr">DOJ</th>
              <th className="color-tr">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              
              <Fragment>
                {editEmployeeId === employee._id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    employee={employee}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <hr style={{width:"75rem"}}/>
      <h2 className="color-tr">Add an Employee</h2>
      <form onSubmit={handleAddFormSubmit} className="formi">
        <input
          type="text"
          name="name"
          // required="required"
          placeholder="Enter name..."
          onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleAddFormChange(event)}
         className="outline"
        />
        <input
          type="email"
          name="email"
          // required="required"
          placeholder="Enter email..."
          onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleAddFormChange(event)}
          className="outline"
        />
        <input
          type="text"
          name="phone"
          // required="required"
          placeholder="Enter phone number..."
          onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleAddFormChange(event)}
          className="outline"
        />
        <input
          type="salary"
          name="salary"
          // required="required"
          placeholder="Enter salary..."
          onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleAddFormChange(event)}
          className="outline"
        />
         <input
          type="doj"
          name="doj"
          // required="required"
          placeholder="Enter date of joining..."
          onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleAddFormChange(event)}
          className="outline"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
