import useState from "react";

import './inputStyle.css';

function Inputfields() {
    
    const [pagedLogger, setPagedLogger] = useState([]);
    const [filter, setFilter] = useState({startDate:"",endDate:"",applicationId:""})
    
    const filterbtnClick=()=>{
        const filteredLog =  pagedLogger.filter((log)=>{
            if ((new Date(log.creationTimestamp)>=new Date(filter.startDate) && new Date(log.creationTimestamp)<=new Date(filter.endDate)) || log.applicationId===filter.applicationId)
            return log;
            // setPagedLogger:(filteredLog);
        })
    }
    
    return (
        <>
            <form action="#" className='inputForm'>
                <div className="inputRow">
                    <div className="inputCol">
                        <label htmlFor="#">Employee name</label>
                        <input type="text" className='customField' placeholder='w.g. Admin.User' />
                    </div>
                    <div className="inputCol">
                        <label htmlFor="#">Action type</label>
                        <select className='customField formSelect' name="actionType" id="actionType">
                            <option value="0"></option>
                            <option value="1">1</option>
                        </select>
                    </div>
                    <div className="inputCol">
                        <label htmlFor="#">Application type</label>
                        <select className='customField formSelect' name="actionType" id="actionType">
                            <option value="0"></option>
                            <option value="1"></option>
                        </select>
                    </div>
                    <div className="inputCol">
                        <label htmlFor="startDate">From Date</label>
                        <input type="date" className='customField' id="startDate" value={filter.startDate} 
                            onChange={(event)=>{
                                setFilter({...filter,startDate:event.target.value})
                            }}
                        placeholder='Select date' />
                    </div>
                    <div className="inputCol">
                        <label htmlFor="endDate">To Date</label>
                        <input type="date" className='customField' id="endDate" value={filter.endDate}
                            onChange={(event)=>{
                                setFilter({...filter,endDate:event.target.value})
                            }}
                        placeholder='Select date' />
                    </div>
                    <div className="inputCol">
                        <label htmlFor="#">Application ID</label>
                        <input type="text" className='customField' value={filter.applicationId} 
                            onChange={(event)=>{
                                setFilter({...filter,applicationId:event.target.value}) 
                            }} placeholder='e.d.219841/2021' />
                    </div>
                    <div className="btnHolder">
                        <button type="submit" className='btn btn-primary' onClick={filterbtnClick}>Search Logger</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Inputfields;
