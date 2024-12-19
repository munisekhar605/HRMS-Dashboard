import './Attendance.css';
import { BiDotsVertical } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
function Attendance(){
    return(
        <>
        <div className="candidates-filter-container">
        <div className='candidates-filter-container-l'>
            <select className="employ-e-filter-item" name="experience" id="experience">
             <option value="All">ALL</option>
            <option value="1">EX 1</option>
            <option value="2">EX 2</option>
            <option value="3">EX 3</option>
            <option value="4">EX 4</option>
            <option value="5">EX 5</option>
        </select>
        
        </div>
        <div className='candidates-filter-container-r'>
            <input className='candidates-search-r' placeholder="🔍 Search...." type='text'></input>
           
        </div>
        </div>
        <div className="candidates-container">
            {/* <BiDotsVertical/> */}
            <div className="candidates-t-name-container">
               <p>Name</p> <p>Email Adress</p>  <p>Phone Number</p> <p>Position</p> <p>Department</p> <p>Date of joing</p> 
            </div>

            <div>

            </div>
        </div>
        </>
    )
}
export default Attendance;