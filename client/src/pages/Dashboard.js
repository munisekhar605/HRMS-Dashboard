import './Dashboard.css';
import Candidates from '../components/CandidatesField/Candidates';
import EmployeeList from '../components/EmployeeField/Employee';
import Attendance from '../components/AttendanceField/Attendance';
import { useState } from 'react';
import { FiUserPlus, FiUsers } from "react-icons/fi";
import { TbChartInfographic } from "react-icons/tb";
import { GoTrophy } from "react-icons/go";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
function Dashboard() {
    const [page, setPage] = useState('Candidates');
    const navigate = useNavigate();
    const handlePageChangeCandidates = () => setPage('Candidates');
    const handlePageChangeEmployee = () => setPage('Employee');
    const handlePageChangeAttendance = () => setPage('Attendance');
    const handlePageChangeLevels = () => setPage('Levels');
    const handleLogOut = () =>{
         localStorage.removeItem("JWT");
         navigate('/login')
    };

    const pages = {
        Candidates: <Candidates />,
        Employee: <EmployeeList />,
        Attendance: <Attendance/>,
        Levels: <div>Levels Content</div>,
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-l-container">
                <h2 className="dashboard-l-heading">Logo</h2>
                <input
                    className="dashboard-l-search"
                    placeholder="🔍 Search...."
                    type="text"
                />
                <div className="dashboard-l-items-c">Recruitment</div>
                <button className="dashboard-l-button" style={{ color: page==="Candidates" ? 'blue' : '' }} onClick={handlePageChangeCandidates}>
                   <FiUserPlus /> Candidates
                </button>
                <div className="dashboard-l-items-c">Organization</div>
                <button className="dashboard-l-button" style={{ color: page==="Employee" ? 'blue' : '' }} onClick={handlePageChangeEmployee}>
                   <FiUsers /> Employee
                </button>
                <button className="dashboard-l-button" style={{ color: page==="Attendance" ? 'blue' : '' }} onClick={handlePageChangeAttendance}>
                    <TbChartInfographic /> Attendance
                </button><br />
                <button className="dashboard-l-button" style={{ color: page==="Levels" ? 'blue' : '' }} onClick={handlePageChangeLevels}>
                  <GoTrophy /> Levels
                </button>
                <div className="dashboard-l-items-c">Others</div>
                <button className="dashboard-l-button"  onClick={handleLogOut}>
                  <RiLogoutBoxRLine /> Log Out
                </button>
            </div>
            <div className="dashboard-r-container">
                <div className="dashboard-r-headr-container">
                    <p className="dashboard-heading">{page}</p>
                    <div className='dashboard-admin'>
                        <IoIosNotificationsOutline className='dashboard-icon' />
                        <CiMail className='dashboard-icon' />
                        <img className='dashboard-admin-img' src="https://res.cloudinary.com/dxdp5nwzn/image/upload/v1734519974/cn9zaujkd9ohjv6ft7ri.jpg" alt="Admin" />
                    </div>
                </div>
                {pages[page] || <div>Page not found</div>}
            </div>
        </div>
    );
}

export default Dashboard;
