import React from 'react';
import { MdOutlineCancel } from "react-icons/md";

function AddEmployee({ setShowModal, newEmployee, handleInputChange, handleAddEmployee }) {
    return (
        <div className="Candidat-add-container">
            <div className="Candidat-add-heading-container">
                <p className="Candidat-add-heading">Add New Employee</p>
                <button className="Candidat-add-cencel-icon" onClick={() => setShowModal(false)}>
                    <MdOutlineCancel style={{ color: "black", fontSize: "20px" }} />
                </button>
            </div>
            <div className="Candidat-form-container">
                <form>
                    <input
                        className="Candidat-form-input"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newEmployee.name}
                        onChange={handleInputChange}
                    />
                    <input
                        className="Candidat-form-input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={newEmployee.email}
                        onChange={handleInputChange}
                    />
                    <input
                        className="Candidat-form-input"
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={newEmployee.phone}
                        onChange={handleInputChange}
                    />
                    <input
                        className="Candidat-form-input"
                        type="text"
                        name="position"
                        placeholder="Position"
                        value={newEmployee.position}
                        onChange={handleInputChange}
                    />
                    <input
                        className="Candidat-form-input"
                        type="text"
                        name="department"
                        placeholder="Department"
                        value={newEmployee.department}
                        onChange={handleInputChange}
                    />
                    <input
                        className="Candidat-form-input"
                        type="date"
                        name="dateOfJoining"
                        value={newEmployee.dateOfJoining}
                        onChange={handleInputChange}
                    />
                    <button
                        type="button"
                        className="Candidat-form-buttton"
                        onClick={handleAddEmployee}
                    >
                        Add Employee
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddEmployee;
