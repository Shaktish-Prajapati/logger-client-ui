import React, {useState, useEffect} from 'react'
import Navbarr from './Navbarr'
// import ProjectSideBar from './ProjectSideBar'
import './NewLogTable.css'
import BootstrapTable from "react-bootstrap-table-next"
import filterFactory, { selectFilter, textFilter } from 'react-bootstrap-table2-filter';
import { faHome, faWrench, faCopy, faPlus, faArrowCircleRight, faSignOutAlt, faUserAlt, faChartPie } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import {getProjectByCode} from '../action/ProjectAction'
import SpinLoader from './support/SpinLoader'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import * as IoIcons from 'react-icons/io'
import * as jQuery from 'jquery';
import ReactPaginate from 'react-paginate';
import Dropdown from '@restart/ui/esm/Dropdown';
import {DropdownButton} from 'react-bootstrap'

const { SearchBar } = Search;




function errorFormatter(cell, row) {
    if (row.logType) {
      return (
        <span>
          {
            cell === 'error' ? <strong style={ { color: 'red' } }>{ cell.toUpperCase() }</strong> : 
            cell === 'warn' ? <strong style={ { color: 'violet' } }>{ cell.toUpperCase() }</strong> : 
            cell === 'info' ? <strong style={ { color: 'blue' } }>{ cell.toUpperCase() }</strong> :
            cell === 'verbose' ? <strong style={ { color: 'green' } }>{ cell.toUpperCase() }</strong> :
            <strong style={ { color: 'orange' } }>{ cell.toUpperCase() }</strong>
          }
          
        </span>
      );
    }
  
    return (
      <span>$ { cell } NTD</span>
    );
  }
  
    const defaultSorted = [{
      dataField: 'name',
      order: 'desc'
    }];
    
    const columns = [{
      dataField: 'did',
      text: 'Mac address',
      sort:true,
    }, 
    {
        dataField: 'logMsg',
        text: 'Log Message',
        // style: { backgroundColor: 'green' }
      
    },
    {
      dataField: 'logType',
      text: 'Log Type',
    //   filter: textFilter(),
      formatter: errorFormatter,
      sort:true
    },
    {
        dataField: 'logGeneratedDate',
        text: 'Log Generated At',
      //   filter: textFilter(),
        formatter: cell => cell.split("T")[0],
        sort:true
      },

    {
        dataField: 'logGeneratedDate',
        text: 'Log Generated Time',
      //   filter: textFilter(),
        formatter: cell => cell.split("T")[1],
        sort:true
      },

    {
      dataField: 'device_types',
      text: 'Device Code',
      formatter: cell => cell.split("|")[0],
      
    //   filter: textFilter(),
      sort:true
    },
    {
      dataField: 'device_types',
      text: 'Device Type',
      formatter: cell => cell.split("|")[1],
      
    //   filter: textFilter(),
      sort:true
    }
  ];
const NewLogTable = () => {
    const [date, setDate] = useState({
      start:'',
      end:''
    })
    const [logType,setLogType] = useState({
      error:false,
      info:false,
      warn:false,
      debug:false,
      verbose:false
    })
    const [debug,setDebug] = useState("false")
    const [pageNo, setPageNo] = useState(0);
    const [record, setRecords] = useState(25);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code')
    const projectName = urlParams.get('name')
    const dispatch = useDispatch()
    const getAllLogByCodeReducer = useSelector(state => state.getAllLogByCodeReducer)
    const {loading, data} = getAllLogByCodeReducer
    console.log(code)

    const refreshButton = ()=>{
      setDate('')
      setLogType({
        error:false,
        info:false,
        warn:false,
        debug:false,
        verbose:false
      })
        dispatch(getProjectByCode(code))
    }

    const filterOnDate = ()=>{
      dispatch(getProjectByCode(code,date))
    }
    const filterOnLogType = ()=>{
      console.log(logType)
      // dispatch(getProjectByCode(code,null,logType))
    }

    const resetFilter=()=>{
      setDate('')
      setPageNo(0)
      setLogType({
        error:false,
        info:false,
        warn:false,
        debug:false,
        verbose:false
      })
      // setLogType({...logType})
      dispatch(getProjectByCode(code,record))

    }
    const handlePageClick = (data)=>{
      if (pageNo !== data.selected) {
          setPageNo(data.selected)
      }
  }

    // useEffect(() => {
    //     dispatch(getProjectByCode(code))
    // }, [])

    console.log("page no"+pageNo)

    const navbardetail = {
        name: projectName,
        dashName:projectName,
        link1:{
            iconName:faHome,
            linkName:'Logs',
            link:`/newlogTable?code=${code}&name=${projectName}`
        },
        link2:{
            iconName:faChartPie,
            linkName:'Analytics',
            link:`/analytics?code=${code}&name=${projectName}`
        }
  
    }
    
    useEffect(() => {
      console.log("inside the logtype useEffect")
      if (logType.error|| logType.info || logType.warn || logType.debug || logType.verbose) {
          dispatch(getProjectByCode(code,null,logType,pageNo,record))
      } else {
        setPageNo(0)
        dispatch(getProjectByCode(code,null,null,pageNo,record))
      }
    }, [logType]);

    useEffect(() => {
      if (logType.error|| logType.info || logType.warn || logType.debug || logType.verbose) {
        dispatch(getProjectByCode(code,null,logType,pageNo,record))
      }else {
        dispatch(getProjectByCode(code,null,null,pageNo,record))
      }
    }, [pageNo,record]);

    var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

function showPagesRecord() {
  var checkboxes = document.getElementById("pagesRecord");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

    return (
        <>
            <Navbarr navbardetails = {navbardetail}  />
            {/* <ProjectSideBar /> */}
            {/* <div style={{paddingTop:'1%'}}> */}
            <div style={{marginTop:'6%', width:'85%', float:'right'}}>
            <IoIcons.IoIosRefreshCircle onClick={refreshButton} className='refreshButton' />
              {
                loading ? <SpinLoader /> :<>
                    {
                        data && data.data && data.data.logs ? 
                    //     <BootstrapTable 
                        
                    //     keyField='_id' 
                    //     key = {data.data.logs._id} 
                    //     data={ data.data.logs } 
                    //     columns={ columns } 
                    //     filter={ filterFactory() } 
                    //     noDataIndication="No data found" 
                    //     pagination={ paginationFactory() }
                    //     theadStyle={ { backgroundColor: 'red' } }
            
                    //   /> 
                    
                    <ToolkitProvider
                    keyField="_id"
                    data={ data.data.logs }
                    columns={ columns }
                    // noDataIndication="No data found" 
                    // pagination={ paginationFactory() }
                    search
                    >
                    {
                        props => (
                        <div style={{}}>
                            <SearchBar style={{width:'30%', display:'block'}} { ...props.searchProps } placeholder="Enter filter..." />
                            
                            <div class="row">
                              <div class="col">
                              <label style={{color:'#3E8BE2',fontWeight:'bold',float:'left'}} >Start date </label>
                                <input type="date" value={date.start} onChange={e=>setDate({...date,start:e.target.value})} className="form-control" style={{color:'#3E8BE2',fontWeight:'bold',float:'left'}} />
                                
                              </div>
                              <div class="col">
                              <label style={{color:'#3E8BE2',fontWeight:'bold',float:'left'}} >End date </label>
                                <input type="date" max={Date.now()} value={date.end} onChange={e=>setDate({...date,end:e.target.value})} className="form-control" style={{color:'#3E8BE2',fontWeight:'bold',float:'left'}} />
                              
                              </div>
                              <div class="col">
                              <button type="button" onClick={filterOnDate} style={{background:'#3E8BE2',fontWeight:'bold',float:'left',verticalAlign:'center', marginTop:'12%'}} className="btn btn-primary">Apply date</button>
                              </div>

                              <div class="col">
                            <div class="multiselect">
                                <div class="selectBox" style={{borderColor:'#3E8BE2'}} onClick={showCheckboxes}>
                                  <select style={{borderColor:'#3E8BE2', background:'none', color:'#3E8BE2', marginTop:'12%', borderRadius:'5px',height:'35px'}}  >
                                    <option>Select an option</option>
                                  </select>
                                  <div class="overSelect"></div>
                                </div>
                                <div id="checkboxes" style={{borderColor:'#3E8BE2', background:'none',borderRadius:'5px'}}>
                                  <label for="debug" style={{color:'#3E8BE2'}} >
                                    <input type="checkbox" style={{color:'#3E8BE2'}} id="debug" checked={logType.debug} onClick={e=>{setLogType({...logType,debug:!logType.debug})}} />Debug</label>
                                  <label for="warn" style={{color:'#3E8BE2'}} >
                                    <input type="checkbox" id="warn" checked={logType.warn} onClick={e=>{setLogType({...logType,warn:!logType.warn})}} />Warn</label>
                                  <label for="info" style={{color:'#3E8BE2'}} >
                                    <input type="checkbox" id="info" checked={logType.info} onClick={e=>{setLogType({...logType,info:!logType.info})}} />Info</label>
                                  <label for="error" style={{color:'#3E8BE2'}} >
                                    <input type="checkbox" id="error" checked={logType.error} onClick={e=>{setLogType({...logType,error:!logType.error})}} />Error</label>
                                </div>
                              </div>

                              </div>
                              {/* <div class="col">
                              <button type="button" onClick={filterOnLogType} style={{background:'#3E8BE2',fontWeight:'bold',float:'left',verticalAlign:'center', marginTop:'12%'}} className="btn btn-primary">Apply Filter</button>
                              </div> */}
                              <div class="col">
                              <button type="button" onClick={resetFilter} style={{background:'#3E8BE2',fontWeight:'bold',float:'left',verticalAlign:'center', marginTop:'12%'}} className="btn btn-primary">Reset Filter</button>
                              </div>
                              <div class='col'>
                              <div class="multiselect">
                                <div class="selectBox" style={{borderColor:'#3E8BE2'}} onClick={showPagesRecord}>
                                  <select style={{borderColor:'#3E8BE2', background:'none', color:'#3E8BE2', marginTop:'12%', borderRadius:'5px',height:'35px'}}  >
                                    <option>Record Per Page</option>
                                  </select>
                                  <div class="overSelect"></div>
                                </div>
                                <div id="PagesRecord" style={{borderColor:'#3E8BE2', background:'none',borderRadius:'5px'}}>
                                  <label for="10" style={{color:'#3E8BE2'}} >
                                    <input type="checkbox" style={{color:'#3E8BE2'}} id="10" checked={record === 10} onClick={e=>{setRecords(10)}} />10</label>
                                  <label for="25" style={{color:'#3E8BE2'}} >
                                    <input type="checkbox" id="25" checked={record === 25}  onClick={e=>{setRecords(25)}} />25</label>
                                  <label for="50" style={{color:'#3E8BE2'}} >
                                    <input type="checkbox" id="50" checked={record === 50}  onClick={e=>{setRecords(50)}} />50</label>
                                  <label for="100" style={{color:'#3E8BE2'}} >
                                    <input type="checkbox" id="100" checked={record === 100} onClick={e=>{setRecords(100)}} />100</label>
                                </div>
                              </div>
                              </div>
                              
                            </div>
                            <BootstrapTable
                            { ...props.baseProps }
                            noDataIndication="No data found" 
                            // pagination={ paginationFactory({
                            //   // custom: true,
                            //   sizePerPage:25,
                            //   totalSize: data.data.logs.length
                            // }) 
                          // }
                            />
                        </div>
                        )
                    }
                    </ToolkitProvider>
                      : <h2 style={{color:'#212925', alignItems:'center'}}>No Log Available</h2>

                    }
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="Next >"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      pageCount={data&& data.data&&data.data.count/record}
                      // previousLabel="< Previous"
                      renderOnZeroPageCount={null}
                      containerClassName={"pagination"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      nextClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextLinkClassName={'page-link'}
                    />
                    </>
                  }
                  </div>

            {/* </div> */}
        </>
    )
}

export default NewLogTable
