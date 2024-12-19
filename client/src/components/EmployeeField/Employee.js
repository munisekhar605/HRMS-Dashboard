import './Employee.css';
import { BiDotsVertical } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md"; 
import { useState, useEffect } from 'react';
import AddEmployee from './addEmployee';
import { createEmployee, getEmployees, deleteEmployees } from "../../services/api"; // Import API functions
import { MdDeleteOutline } from "react-icons/md";
function EmployeeList() {
    const [employees, setEmployees] = useState([]); // Initial state for employee list
    const [selectedPosition, setSelectedPosition] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [newEmployee, setNewEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        dateOfJoining: ''
    });
useEffect(() => {
    const fetchEmployees = async () => {
        try {
            const data = await getEmployees(); // Call the API to get the employees data
            console.log("API Response:", data); // Log the data to see its structure
            
            // Check if the response contains 'data' and it's an array of employees
            if (data && data.success && Array.isArray(data.data)) {
                setEmployees(data.data); // Update state with the employees array
            } else {
                console.error("Invalid response structure:", data); // Handle case where employees are missing or malformed
            }
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    };

    fetchEmployees(); // Call the function to fetch employees
}, []); // Empty dependency array ensures this effect runs once when the component mounts


    const filteredEmployees = employees.filter(employee => {
        const matchesPosition = selectedPosition === 'All' || employee.position === selectedPosition;
        const matchesSearchTerm = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  employee.phone.includes(searchTerm);

        return matchesPosition && matchesSearchTerm;
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee((prev) => ({
            ...prev,
            [name]: value
        }));
    };

const handleAddEmployee = async () => {
  try {
    const response = await createEmployee(newEmployee); 
    console.log("Employee Add Response:", response);

    if (response && response._id) {
      setEmployees((prev) => [...prev, response]); 
      setShowModal(false); 
      setNewEmployee({ name: '', email: '', phone: '', position: '', department: '', dateOfJoining: '' }); 
    } else {
      alert("Failed to add employee. Please try again.");
    }
  } catch (error) {
    console.error("Error adding employee:", error);
    alert("An error occurred while adding the employee."); 
  }
};

const handleDeleteEmployee = async (employeeId) => {
    try {
        const response = await deleteEmployees(employeeId);
        if (response.success) {
            // Make sure to use the correct key for the employee ID (employee._id)
            setEmployees((prev) => prev.filter((employee) => employee._id !== employeeId)); 
        } else {
            alert("Failed to delete employee. Please try again.");
        }
    } catch (error) {
        console.error("Error deleting employee:", error); // Log the error message
        alert("An error occurred while deleting the employee.");
    }
};


    return (
        <>
            <div className="employee-filter-container">
                <div className='employee-filter-container-l'>
                    <select
                        className="employ-e-filter-item"
                        value={selectedPosition}
                        onChange={(e) => setSelectedPosition(e.target.value)}
                    >
                        <option value="All">All Positions</option>
                        <option value="Team Lead">Team Lead</option>
                        <option value="Full Stack">Full Stack</option>
                        <option value="Intern">Intern</option>
                        <option value="Scenario Developer">Scenario Developer</option>
                        <option value="Senior Designer">Senior Designer</option>
                    </select>
                </div>
                <div className='employee-filter-container-r'>
                    <input
                        className='employee-search-r'
                        placeholder="🔍 Search..."
                        type='text'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className='employee-add-button' onClick={() => setShowModal(true)}>Add Employee</button>
                </div>
            </div>

            <div className="employee-container">
                <div className="employee-t-name-container">
                    <p>Name</p> <p>Email Address</p> <p>Phone Number</p> <p>Position</p> <p>Department</p> <p>Date of Joining</p>
                </div>

                <div className="employee-list">
                    {filteredEmployees.map((employee, index) => (
                        <div className="employee-item" key={index}>
                            <p>{employee.name}</p>
                            <p>{employee.email}</p>
                            <p>{employee.phone}</p>
                            <p>{employee.position}</p>
                            <p>{employee.department}</p>
                            <p>{employee.dateOfJoining}</p>
                            <MdDeleteOutline className="dots-icon" onClick={() => handleDeleteEmployee(employee._id)} />
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <AddEmployee 
                    setShowModal={setShowModal}
                    newEmployee={newEmployee}
                    handleInputChange={handleInputChange}
                    handleAddEmployee={handleAddEmployee}
                />
            )}
        </>
    );
}

export default EmployeeList;
