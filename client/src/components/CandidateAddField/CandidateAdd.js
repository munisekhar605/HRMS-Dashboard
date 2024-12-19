import './CandidateAdd.css';
import { MdOutlineCancel } from "react-icons/md";
import { newCandidate } from '../../services/api'; 
import { useState } from 'react';

function CandidateAddField({ cancel, onAdd }) {
    const [candidateData, setCandidateData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        department: "",
        experience: "",
        resume: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setCandidateData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            Object.entries(candidateData).forEach(([key, value]) => {
                formData.append(key, value);
            });
            await newCandidate(formData);
            onAdd(); 
            cancel();  
            alert("Candidate added successfully!");
        } catch (error) {
            console.error("Error adding candidate:", error);
            alert("Failed to add candidate. Please try again.");
        }
    };

    return (
        <div className="Candidat-add-container">
            <div className="Candidat-add-heading-container">
                <h2 className="Candidat-add-heading">Add New Candidate</h2>
                <MdOutlineCancel className="Candidat-add-cencel-icon" onClick={cancel} />
            </div>

            <div className="Candidat-form-container">
                <input
                    className="Candidat-form-input"
                    name="fullName"
                    value={candidateData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                />
                <input
                    className="Candidat-form-input"
                    name="email"
                    value={candidateData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                />
                <input
                    className="Candidat-form-input"
                    name="phoneNumber"
                    value={candidateData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                />
                <input
                    className="Candidat-form-input"
                    name="department"
                    value={candidateData.department}
                    onChange={handleChange}
                    placeholder="Department"
                />
                <input
                    className="Candidat-form-input"
                    name="experience"
                    value={candidateData.experience}
                    onChange={handleChange}
                    placeholder="Experience"
                />
                <input
                    type="file"
                    className="Candidat-form-input"
                    name="resume"
                    accept="application/pdf" 
                    onChange={handleChange}
                />
                <button className="Candidat-form-buttton" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default CandidateAddField;
