import './Candidates.css';
import { useState, useEffect } from 'react';
import CandidateAddField from '../CandidateAddField/CandidateAdd';
import { fetchCandidates, deleteCandidate, updateStatus } from '../../services/api'; 
import { MdDeleteOutline } from "react-icons/md";

function Candidates() {
    const [candidate, addCandidate] = useState(false);
    const [candidatesList, setCandidatesList] = useState([]);  
    const [loading, setLoading] = useState(false);  

    // Filter states
    const [experienceFilter, setExperienceFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState(''); 

    // Handle add candidate modal
    const handelAddCandidate = () => {
        addCandidate(true);
    };

    // Handle cancel candidate modal
    const handelCancelCandidate = () => {
        addCandidate(false);
    };

    // Fetch candidates on component mount
    useEffect(() => {
        const loadCandidates = async () => {
            setLoading(true);  
            try {
                const data = await fetchCandidates();  
                setCandidatesList(data);  
            } catch (error) {
                console.error("Error fetching candidates:", error);
            } finally {
                setLoading(false);  
            }
        };

        loadCandidates();  
    }, []);  

    // Handle delete candidate
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this candidate?');
        if (confirmDelete) {
            try {
                await deleteCandidate(id);  
              
                setCandidatesList(candidatesList.filter(candidate => candidate._id !== id));
            } catch (error) {
                console.error("Error deleting candidate:", error);
            }
        }
    };

    const handleCandidateAdded = async () => {
        const data = await fetchCandidates();  
        setCandidatesList(data);  
    };

    // Handle status update
    const handleStatusChange = async (candidateId, newStatus) => {
        try {
            await updateStatus(candidateId, newStatus); 
            const updatedCandidates = candidatesList.map(candidate => {
                if (candidate._id === candidateId) {
                    return { ...candidate, status: newStatus };  
                }
                return candidate;
            });
            setCandidatesList(updatedCandidates);  
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const filteredCandidates = candidatesList.filter((candidate) => {
        const experienceMatch = experienceFilter === 'All' || candidate.experience === experienceFilter;
        const statusMatch = statusFilter === 'All' || candidate.status === statusFilter;
        const searchMatch = 
            candidate.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            candidate.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase());
        return experienceMatch && statusMatch && searchMatch;
    });


    const getStatusClass = (status) => {
        switch (status) {
            case 'rejected':
                return 'rejected';  
            case 'pending':
                return 'pending';  
            case 'selected':
                return 'selected'; 
            default:
                return 'new'; 
        }
    };

    return (
        <>
            <div className="candidates-filter-container">
                <div className="candidates-filter-container-l">
                    <select
                        className="candidates-e-filter-item"
                        value={experienceFilter}
                        onChange={(e) => setExperienceFilter(e.target.value)}
                    >
                        <option value="All">All Experience</option>
                        <option value="1">EX 1</option>
                        <option value="2">EX 2</option>
                        <option value="3">EX 3</option>
                        <option value="4">EX 4</option>
                        <option value="5">EX 5</option>
                    </select>
                    <select
                        className="candidates-e-filter-item"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                        <option value="selected">Selected</option>
                    </select>
                </div>
                <div className="candidates-filter-container-r">
                    <input
                        className="candidates-search-r"
                        placeholder="🔍 Search..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}  
                    />
                    <button className="candidates-add-button" onClick={handelAddCandidate}>Add New Candidate</button>
                </div>
            </div>

            {candidate ? <CandidateAddField cancel={handelCancelCandidate} onAdd={handleCandidateAdded} /> : ""}

            <div className="candidates-container">
                <div className="candidates-t-name-container">
                    <p>Sr No:</p> <p>Name</p> <p>Email</p> <p>Phone Number</p> <p>Position</p> <p>Status</p> <p>Experience</p> <p>Resume</p> <p>Action</p>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    filteredCandidates.length === 0 ? (
                        <p>No candidates found matching the filters or search criteria.</p>
                    ) : (
                        filteredCandidates.map((candidate, index) => (
                            <div key={candidate._id} className="candidate-item">
                                <p>{index + 1}</p>
                                <p>{candidate.fullName}</p>
                                <p>{candidate.email}</p>
                                <p>{candidate.phoneNumber}</p>
                                <p>{candidate.department}</p>
                                <p className={getStatusClass(candidate.status)} onClick={() => handleStatusChange(candidate._id, candidate.status === 'new' ? 'pending' : candidate.status === 'pending' ? 'selected' : candidate.status === 'selected' ? 'rejected' : 'new')}>
                                    {candidate.status}
                                </p>
                                <p>{candidate.experience}</p>
                                <p><a href={candidate.resume} target="_blank" rel="noopener noreferrer">Download</a></p>
                                <p>
                                    <MdDeleteOutline className='delete-button' onClick={() => handleDelete(candidate._id)} />
                                </p>
                            </div>
                        ))
                    )
                )}
            </div>
        </>
    );
}

export default Candidates;
