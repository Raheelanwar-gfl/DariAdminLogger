import { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';

import './tabelStyle.css';

function LoggerTabel() {
    const [loggerData, setLoggerData] = useState([]);
    const [pagedLogger, setPagedLogger] = useState([]);
    const [pageCount, setPageCount] = useState(10);
    useEffect(() => {
        fetch('https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f')
            .then((tabeldata) => {
                return tabeldata.json();
            }).then((tabeldata) => {
                setLoggerData(tabeldata.result.auditLog);
                setPagedLogger(tabeldata.result.auditLog.slice(0, 10));
            })
    }, []);
    // console.log(loggerData);
    const handlePageClick = (event) => {
        const pagedArray = loggerData.slice(event.selected * 10, (event.selected + 1) * 10)
        setPagedLogger(pagedArray);
    }
    const sortLogid = () => {
        const sortArray = pagedLogger.sort((a, b) => (a.logId > b.logId) ? 1 : -1)
        setPagedLogger([...sortArray]);
    }
    const sortApplicationType = () => {
        const sortArray = pagedLogger.sort((a, b) => (a.applicationType > b.applicationType) ? 1 : -1)
        setPagedLogger([...sortArray]);
    }
    const sortApplicationId = () => {
        const sortArray = pagedLogger.sort((a, b) => (a.applicationId > b.applicationId) ? 1 : -1)
        setPagedLogger([...sortArray]);
    }
    const sortAction = () => {
        const sortArray = pagedLogger.sort((a, b) => (a.actionType > b.actionType) ? 1 : -1)
        setPagedLogger([...sortArray]);
    }
    const sortDateTime = () => {
        const sortArray = pagedLogger.sort((a, b) => (a.creationTimestamp > b.creationTimestamp) ? 1 : -1)
        setPagedLogger([...sortArray]);
        // console.log(sortArray);
    }

    const [filter, setFilter] = useState({ startDate: "", endDate: "", applicationId: "" })

    const filterbtnClick = () => {
        console.log(filter);
        const filteredLog = loggerData.filter(log => {

            const evr = Object.entries(filter).filter(([key, value]) => {
                return !!value
            })
            return evr.every(([key, value]) => {


                if (key === 'startDate') {
                    const logDate = new Date(log.creationTimestamp);
                    logDate.setHours(0, 0, 0, 0)
                    const filterDate = new Date(value);
                    filterDate.setHours(0, 0, 0, 0)

                    console.log({ key, value, logValue: logDate, 'startDate': logDate >= filterDate })
                    return logDate >= filterDate
                }
                else if (key === 'endDate') {
                    const logDate = new Date(log.creationTimestamp);
                    logDate.setHours(0, 0, 0, 0)
                    const filterDate = new Date(value);
                    filterDate.setHours(0, 0, 0, 0)

                    return logDate <= filterDate
                }
                else if (key === 'applicationId') {
                    return log[key] === +value
                }
                else
                    return false;

            })
        })
        const filteredSlice = filteredLog.slice(0, 10);
        // console.log('b', b);
        setPageCount(filteredLog.length / 10);
        setPagedLogger([...filteredSlice]);
    }

    return (
        <>
            <div className='inputForm'>
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
                            onChange={(event) => {
                                setFilter({ ...filter, startDate: event.target.value })
                            }}
                            placeholder='Select date' />
                    </div>
                    <div className="inputCol">
                        <label htmlFor="endDate">To Date</label>
                        <input type="date" className='customField' id="endDate" value={filter.endDate}
                            onChange={(event) => {
                                setFilter({ ...filter, endDate: event.target.value })
                            }}
                            placeholder='Select date' />
                    </div>
                    <div className="inputCol">
                        <label htmlFor="#">Application ID</label>
                        <input type="text" className='customField' value={filter.applicationId}
                            onChange={(event) => {
                                setFilter({ ...filter, applicationId: event.target.value })
                            }} placeholder='e.d.219841/2021' />
                    </div>
                    <div className="btnHolder">
                        <button type="submit" className='btn btn-primary' onClick={filterbtnClick}>Search Logger</button>
                    </div>
                </div>
            </div>
            <div className="tabelframe">
                <div className="tabelRow tabelHead">
                    <div className="col">
                        Log ID
                        <button type='button' className="switcherIcon" onClick={sortLogid}>
                            <svg className='icon' width='18' height='18' viewBox="0 0 24 24" aria-hidden="true"><path d="M13 19V7.83l4.88 4.88c.39.39 1.03.39 1.42 0 .39-.39.39-1.02 0-1.41l-6.59-6.59a.9959.9959 0 00-1.41 0l-6.6 6.58c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L11 7.83V19c0 .55.45 1 1 1s1-.45 1-1z"></path></svg>
                        </button>
                    </div>
                    <div className="col">
                        Application Type
                        <button type='button' className="switcherIcon" onClick={sortApplicationType}>
                            <svg className='icon' width='18' height='18' viewBox="0 0 24 24" aria-hidden="true"><path d="M13 19V7.83l4.88 4.88c.39.39 1.03.39 1.42 0 .39-.39.39-1.02 0-1.41l-6.59-6.59a.9959.9959 0 00-1.41 0l-6.6 6.58c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L11 7.83V19c0 .55.45 1 1 1s1-.45 1-1z"></path></svg>
                        </button>
                    </div>
                    <div className="col">
                        Application ID
                        <button type='button' className="switcherIcon" onClick={sortApplicationId}>
                            <svg className='icon' width='18' height='18' viewBox="0 0 24 24" aria-hidden="true"><path d="M13 19V7.83l4.88 4.88c.39.39 1.03.39 1.42 0 .39-.39.39-1.02 0-1.41l-6.59-6.59a.9959.9959 0 00-1.41 0l-6.6 6.58c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L11 7.83V19c0 .55.45 1 1 1s1-.45 1-1z"></path></svg>
                        </button>
                    </div>
                    <div className="col">
                        Action
                        <button type='button' className="switcherIcon" onClick={sortAction}>
                            <svg className='icon' width='18' height='18' viewBox="0 0 24 24" aria-hidden="true"><path d="M13 19V7.83l4.88 4.88c.39.39 1.03.39 1.42 0 .39-.39.39-1.02 0-1.41l-6.59-6.59a.9959.9959 0 00-1.41 0l-6.6 6.58c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L11 7.83V19c0 .55.45 1 1 1s1-.45 1-1z"></path></svg>
                        </button>
                    </div>
                    <div className="col">
                        Action Details
                        <button type='button' className="switcherIcon">
                            <svg className='icon' width='18' height='18' viewBox="0 0 24 24" aria-hidden="true"><path d="M13 19V7.83l4.88 4.88c.39.39 1.03.39 1.42 0 .39-.39.39-1.02 0-1.41l-6.59-6.59a.9959.9959 0 00-1.41 0l-6.6 6.58c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L11 7.83V19c0 .55.45 1 1 1s1-.45 1-1z"></path></svg>
                        </button>
                    </div>
                    <div className="col">
                        Date: Time
                        <button type='button' className="switcherIcon" onClick={sortDateTime}>
                            <svg className='icon' width='18' height='18' viewBox="0 0 24 24" aria-hidden="true"><path d="M13 19V7.83l4.88 4.88c.39.39 1.03.39 1.42 0 .39-.39.39-1.02 0-1.41l-6.59-6.59a.9959.9959 0 00-1.41 0l-6.6 6.58c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L11 7.83V19c0 .55.45 1 1 1s1-.45 1-1z"></path></svg>
                        </button>
                    </div>
                </div>
                {pagedLogger.map((log) => {
                    return <div className="tabelRow">
                        <div className="col">
                            {log.logId}
                        </div>
                        <div className="col">
                            {log.applicationType}
                        </div>
                        <div className="col">
                            {log.applicationId}
                        </div>
                        <div className="col">
                            {log.actionType}
                        </div>
                        <div className="col">
                            -/-
                        </div>
                        <div className="col">
                            {log.creationTimestamp}
                        </div>
                    </div>
                })}
            </div>
            <nav className="paginationNavigation">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </nav>
        </>
    );
};

export default LoggerTabel;
