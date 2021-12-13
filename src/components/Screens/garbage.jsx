    // !New logtable garbage data --------------------------------- 


  {/*
                    
                     <table>
                      <thead>
                        <tr>
                          <th>Mac address</th>
                          <th>Log Message</th>
                          <th>Log Type</th>
                          <th>Log Generated Time</th>
                          <th>Device Code</th>
                          <th>Device Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.data.logs.map((logsData) => {
                          const deviceCode = logsData.device_types.split(
                            "|",
                            2
                          )[0];
                          const deviceName = logsData.device_types.split(
                            "|",
                            2
                          )[1];

                          const oldDate = logsData.logGeneratedDate;
                          const newDate = oldDate.substring(0, 10);
                          return (
                            <tr>
                              <td>
                                <ReactReadMoreReadLess
                                  charLimit={40}
                                  readMoreText={"Read more ▼"}
                                  readLessText={"Read less ▲"}
                                >
                                  {logsData.did}
                                </ReactReadMoreReadLess>
                              </td>
                              <td>
                                <ReactReadMoreReadLess
                                  charLimit={40}
                                  readMoreText={"Read more ▼"}
                                  readLessText={"Read less ▲"}
                                >
                                  {logsData.logMsg}
                                </ReactReadMoreReadLess>
                              </td>

                              <td>{logsData.logType}</td>
                              <td>{newDate}</td>
                              <td>{deviceCode}</td>
                              <td>{deviceName}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    
                    */}



                    {/*
                    
                    
                    
                      // console.log("data neeraj abhi", data);
  // const logTypeData = () => {
  //   if (data.data.logs.logType == "info") {
  //     return <div className="divCellRow Info">{data.data.logs.logType}</div>;
  //   }
  // };
                    
                    
                    
                    */}





                    {/*
                    
                    
                    
                            {/*
                                    {logsData.logType == "info" ?
                                 <div className="divCellRow Info">{logsData.logType}</div>
                            : (logsData.logType == "warn" ?
                                 <div className="divCellRow Warn">{logsData.logType}</div>
                            :(logsData.logType == "debug" ?
                                 <div className="divCellRow Debug">{logsData.logType}</div>
                            : (logsData.logType == "error" ?
                                <div className="divCellRow Error ">{logsData.logType}</div>
                                : null}
                              
                                  
                                  */}
                              {/*

 {logsData.logType == "info" ? (
                                <div
                                  className="divCellRow"
                                  style={{
                                    backgroundColor: "blue",
                                  }}
                                >
                                  {logsData.logType}
                                </div>
                              ) : logsData.logType == "error" ? (
                                <div
                                  className="divCellRow"
                                  style={{
                                    backgroundColor: "red",
                                  }}
                                >
                                  {logsData.logType}
                                </div>
                              ) : logsData.type == "debug" ? (
                                <div
                                  className="divCellRow"
                                  style={{
                                    backgroundColor: "green",
                                  }}
                                >
                                  {logsData.logType}
                                </div>
                              ) : logsData.type == "warn" ? (
                                <div
                                  className="divCellRow"
                                  style={{
                                    backgroundColor: "orange",
                                  }}
                                >
                                  {logsData.logType}
                                </div>
                              ) : null}
                    
                    
                    
                    
                    
                    
                    
                    */}
                    


                    // neeraj implementation new log table -----------------------

                    import React, { useState, useEffect, useRef } from "react";
                    import Navbarr from "../ui/Navbarr";
                    // import ProjectSideBar from './ProjectSideBar'
                    import "../../css/NewLogTable.css";
                    import BootstrapTable from "react-bootstrap-table-next";
                    import filterFactory, {
                      selectFilter,
                      textFilter,
                    } from "react-bootstrap-table2-filter";
                    import ReactReadMoreReadLess from "react-read-more-read-less";
                    
                    import {
                      faHome,
                      faWrench,
                      faCopy,
                      faPlus,
                      faArrowCircleRight,
                      faSignOutAlt,
                      faUserAlt,
                      faChartPie,
                      faDatabase,
                      faArrowDown
                    } from "@fortawesome/free-solid-svg-icons";
                    import { useDispatch, useSelector } from "react-redux";
                    import { getProjectByCode } from "../../redux/action/ProjectAction";
                    import SpinLoader from "../utils/SpinLoader";
                    import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
                    import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
                    import paginationFactory from "react-bootstrap-table2-paginator";
                    import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
                    import * as IoIcons from "react-icons/io";
                    import * as jQuery from "jquery";
                    import ReactPaginate from "react-paginate";
                    import Dropdown from "@restart/ui/esm/Dropdown";
                    import {
                      Card,
                      Col,
                      Container,
                      DropdownButton,
                      Row,
                      Table,
                    } from "react-bootstrap";
                    import Button from "@restart/ui/esm/Button";
                    import "../../css/theme.css";
                    
                    const { SearchBar } = Search;
                    
                    function errorFormatter(cell, row) {
                      // if (row.logType) {
                      //   return (
                      //     <span>
                      //       {cell === "error" ? (
                      //         <strong style={{ color: "red" }}>{cell.toUpperCase()}</strong>
                      //       ) : cell === "warn" ? (
                      //         <strong style={{ color: "violet" }}>{cell.toUpperCase()}</strong>
                      //       ) : cell === "info" ? (
                      //         <strong style={{ color: "blue" }}>{cell.toUpperCase()}</strong>
                      //       ) : cell === "verbose" ? (
                      //         <strong style={{ color: "green" }}>{cell.toUpperCase()}</strong>
                      //       ) : (
                      //         <strong style={{ color: "orange" }}>{cell.toUpperCase()}</strong>
                      //       )}
                      //     </span>
                      //   );
                      // }
                      // return <span>$ {cell} NTD</span>;
                    }
                    
                    const defaultSorted = [
                      {
                        dataField: "name",
                        order: "desc",
                      },
                    ];
                    
                    const columns = [
                      {
                        dataField: "did",
                        text: "Mac address",
                        sort: true,
                      },
                      {
                        dataField: "logMsg",
                        text: "Log Message",
                        // style: { backgroundColor: 'green' }
                      },
                      {
                        dataField: "logType",
                        text: "Log Type",
                        //   filter: textFilter(),
                        formatter: errorFormatter,
                        sort: true,
                      },
                      {
                        dataField: "logGeneratedDate",
                        text: "Log Generated At",
                        //   filter: textFilter(),
                        formatter: (cell) => cell.split("T")[0],
                        sort: true,
                      },
                    
                      {
                        dataField: "logGeneratedDate",
                        text: "Log Generated Time",
                        //   filter: textFilter(),
                        formatter: (cell) => cell.split("T")[1],
                        sort: true,
                      },
                    
                      {
                        dataField: "device_types",
                        text: "Device Code",
                        formatter: (cell) => cell.split("|")[0],
                    
                        //   filter: textFilter(),
                        sort: true,
                      },
                      {
                        dataField: "device_types",
                        text: "Device Type",
                        formatter: (cell) => cell.split("|")[1],
                    
                        //   filter: textFilter(),
                        sort: true,
                      },
                    ];
                    const NewLogTable = () => {
                      const [date, setDate] = useState({
                        start: "",
                        end: "",
                      });
                      const [logType, setLogType] = useState({
                        error: false,
                        info: false,
                        warn: false,
                        debug: false,
                        verbose: false,
                      });
                    
                      const [debug, setDebug] = useState("false");
                      const [pageNo, setPageNo] = useState(0);
                      const [record, setRecords] = useState(25);
                    
                    
                    
                    
                    
                    
                    
                    
                    
                      // toggle ionc statuses
                      const [macAddressToggleIcon, setMacAddressToggleIcon] = useState(false)
                      const [logMessageToggleIcon, setLogMessageToggleIcon] = useState(false)
                      const [logGenratedToggleIcon, setLogGenratedToggleIcon] = useState(false)
                      const [deviceCodeToggleIcon, setDeviceCodeToggleIcon] = useState(false)
                      const [deviceTypeToggleIcon, setDeviceTypeToggleIcon] = useState(false)
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                      // todo : 1:1 neeraj empty date state
                      const [emptyDate, setEmptyDate] = useState(false);
                    
                      // todo : 1:2 neeraj useref for refresh button click
                      const startDateRef = useRef(null);
                      const endDatRef = useRef(null);
                    
                    
                    
                      const logTypeRef = useRef(null);
                      console.log("logType", logTypeRef.current);
                    
                    
                    
                      // 2) dropdown refresh with drop down button click
                    
                      const queryString = window.location.search;
                      const urlParams = new URLSearchParams(queryString);
                      const code = urlParams.get("code");
                      const projectName = urlParams.get("name");
                      const dispatch = useDispatch();
                      const getAllLogByCodeReducer = useSelector(
                        (state) => state.getAllLogByCodeReducer
                      );
                      const { loading, data } = getAllLogByCodeReducer;
                      // console.log(code);
                    
                    
                    
                    
                      const refreshButton = () => {
                        setDate({
                          start: "",
                          end: "",
                        });
                    
                        setLogType({
                          error: false,
                          info: false,
                          warn: false,
                          debug: false,
                          verbose: false,
                        });
                        dispatch(getProjectByCode(code));
                      };
                    
                      // todo: 1:1 neeraj 6-12-2021 3:33
                      // 1)check if data field are not empty
                      const filterOnDate = () => {
                        if (!date.start && !date.end) {
                          setEmptyDate(true);
                          return;
                        }
                    
                        dispatch(getProjectByCode(code, date));
                        setEmptyDate(false);
                      };
                    
                      // const dataValidatin = () => {};
                    
                      const filterOnLogType = () => {
                        console.log(logType);
                        // dispatch(getProjectByCode(code,null,logType))
                      };
                    
                      const resetFilter = () => {
                        // todo 1:2 useing ref to change inputs values
                        startDateRef.current.value = "";
                        endDatRef.current.value = "";
                    
                        setDate("");
                        setEmptyDate(false);
                        setPageNo(0);
                        setLogType({
                          error: false,
                          info: false,
                          warn: false,
                          debug: false,
                          verbose: false,
                        });
                        // setLogType({...logType})
                        dispatch(getProjectByCode(code, record));
                      };
                      const handlePageClick = (data) => {
                        if (pageNo !== data.selected) {
                          setPageNo(data.selected);
                        }
                      };
                    
                      // useEffect(() => {
                      //     dispatch(getProjectByCode(code))
                      // }, [])
                    
                      console.log("page no" + pageNo);
                    
                      const navbardetail = {
                        name: projectName,
                        dashName: projectName,
                        link1: {
                          iconName: faDatabase,
                          linkName: "Logs",
                          link: `/newlogTable?code=${code}&name=${projectName}`,
                        },
                        link2: {
                          iconName: faChartPie,
                          linkName: "Analytics",
                          link: `/analytics?code=${code}&name=${projectName}`,
                        },
                      };
                    
                      useEffect(() => {
                        console.log("inside the logtype useEffect");
                        if (
                          logType.error ||
                          logType.info ||
                          logType.warn ||
                          logType.debug ||
                          logType.verbose
                        ) {
                          dispatch(getProjectByCode(code, null, logType, pageNo, record));
                        } else {
                          setPageNo(0);
                          dispatch(getProjectByCode(code, null, null, pageNo, record));
                        }
                      }, [logType]);
                    
                      useEffect(() => {
                        if (
                          logType.error ||
                          logType.info ||
                          logType.warn ||
                          logType.debug ||
                          logType.verbose
                        ) {
                          dispatch(getProjectByCode(code, null, logType, pageNo, record));
                        } else {
                          dispatch(getProjectByCode(code, null, null, pageNo, record));
                        }
                      }, [pageNo, record]);
                    
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
                    
                    
                    
                    
                    
                      // toggle function starts here------------------------------
                    
                      const MacAddressToggle = () => {
                        if (macAddressToggleIcon == false) {
                          return setMacAddressToggleIcon(true)
                    
                        }
                        setMacAddressToggleIcon(false)
                      }
                    
                    
                      const LogMessageToggle = () => {
                        if (logMessageToggleIcon == false) {
                          return setLogMessageToggleIcon(true)
                    
                        }
                        setLogMessageToggleIcon(false)
                      }
                    
                    
                      const LogGenratedToggle = () => {
                        if (logGenratedToggleIcon == false) {
                          return setLogGenratedToggleIcon(true)
                    
                        }
                        setLogGenratedToggleIcon(false)
                      }
                    
                    
                      const DeviceCodeToggle = () => {
                        if (deviceCodeToggleIcon == false) {
                          return setDeviceCodeToggleIcon(true)
                    
                        }
                        setDeviceCodeToggleIcon(false)
                      }
                    
                    
                      const DeviceTypeToggle = () => {
                        if (deviceTypeToggleIcon == false) {
                          return setDeviceTypeToggleIcon(true)
                    
                        }
                        setDeviceTypeToggleIcon(false)
                      }
                    
                    
                    
                    
                      // letar on check condition if data will found
                    
                    
                      const [filterData, setFilterData] = useState([]);
                      const [searchInput, setSearchInput] = useState("")
                    
                    
                    
                    
                      // search Input data
                      const getAlldataFunction = async () => {
                    
                        console.log("all data from store", data)
                        const logs = await data.data.logs;
                        console.log("all logs from store", logs)
                    
                        setFilterData(
                          logs.filter(allData =>
                            allData.logGeneratedDate.toLowerCase().includes(searchInput.toLowerCase())
                          )
                        );
                      }
                    
                    
                    
                      // search handlChangeFunction handle change inputStyle
                      const searchHandleChange = (e) => {
                        setSearchInput(e.target.value)
                      }
                    
                    
                      useEffect(() => {
                        getAlldataFunction()
                    
                    
                    
                    
                      }, [searchInput]);
                    
                    
                    
                    
                    
                    
                      return (
                        <>
                          <Navbarr navbardetails={navbardetail} />
                          {/* <ProjectSideBar /> */}
                          {/* <div style={{paddingTop:'1%'}}> */}
                    
                          <Container>
                            <Container
                              style={{
                                marginLeft: "160px",
                                width: "88%",
                                marginTop: "130px",
                              }}
                            >
                              <Row className="text-center card-Custome">
                                <Col>
                    
                                  {/*
                                   <SearchBar
                                    // {...props.searchProps}
                                    placeholder="Enter filter..."
                                  />
                                  */}
                    
                                  <input
                    
                                    style={{ width: "100%", padding: "5px", borderRadius: "10px", border: "1px solid gray" }}
                    
                                    type="text"
                                    placeholder="Search"
                                    value={searchInput}
                                    onChange={searchHandleChange}
                                  />
                    
                    
                    
                    
                    
                    
                    
                                </Col>
                                <Col>
                                  <IoIcons.IoIosRefreshCircle
                                    onClick={refreshButton}
                                    className="refreshButton"
                                  />
                                </Col>
                              </Row>
                              <Row className="filter_row mt-3">
                                <Col>
                                  <Row>
                                    <Col>
                                      <Row>
                                        <Col xl={12}>
                                          <label
                                            style={{
                                              color: "#3E8BE2",
                                              fontWeight: "bold",
                                              float: "left",
                                            }}
                                          >
                                            Start date
                                          </label>
                                          <input
                                            type="date"
                                            value={date.start}
                                            // using ref for chaning state with refresh button clicked
                                            ref={startDateRef}
                                            onChange={(e) =>
                                              setDate({
                                                ...date,
                                                start: e.target.value,
                                              })
                                            }
                                            className={
                                              emptyDate ? "dateempty form-control" : "form-control"
                                            }
                                            style={{
                                              color: "#3E8BE2",
                                              fontWeight: "bold",
                                              float: "left",
                                            }}
                                          />
                                        </Col>
                                        <Col xl={12}>
                                          <label
                                            style={{
                                              color: "#3E8BE2",
                                              fontWeight: "bold",
                                              float: "left",
                                              marginTop: "20px",
                                            }}
                                          >
                                            End date
                                          </label>
                                          <input
                                            type="date"
                                            max={Date.now()}
                                            value={date.end}
                                            // using ref for chaning state with refresh button clicked
                                            ref={endDatRef}
                                            onChange={(e) =>
                                              setDate({ ...date, end: e.target.value })
                                            }
                                            className={
                                              emptyDate ? "dateempty form-control" : "form-control"
                                            }
                                            style={{
                                              color: "#3E8BE2",
                                              fontWeight: "bold",
                                              float: "left",
                                            }}
                                          />
                                        </Col>
                                        <Col xl={12}>
                                          <Button
                                            type="button"
                                            onClick={filterOnDate}
                                            style={{
                                              background: "#3E8BE2",
                                              fontWeight: "bold",
                                              marginTop: "10px",
                                            }}
                                            className="btn btn-primary"
                                          >
                                            Apply date
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Col>
                    
                                    <Col>
                                      <Row>
                                        <Col>
                                          <Col>
                                            <div className="multiselect">
                                              <div
                                                className="selectBox"
                                                style={{ borderColor: "#3E8BE2" }}
                                                onClick={showCheckboxes}
                                              >
                                                <select
                                                  style={{
                                                    borderColor: "#3E8BE2",
                                                    background: "none",
                                                    color: "#3E8BE2",
                                                    marginTop: "32px",
                                                    borderRadius: "5px",
                                                    height: "35px",
                                                  }}
                                                >
                                                  <option>Select an option</option>
                                                </select>
                                                <div className="overSelect"></div>
                                              </div>
                                              <div
                                                id="checkboxes"
                                                style={{
                                                  borderColor: "#3E8BE2",
                                                  background: "none",
                                                  borderRadius: "5px",
                                                }}
                                              >
                                                <label
                                                  for="debug"
                                                  style={{
                                                    color: "#3E8BE2",
                                                    padding: "3px",
                                                  }}
                                                >
                                                  <input
                                                    type="checkbox"
                                                    style={{
                                                      color: "#3E8BE2",
                                                      padding: "3px",
                                                    }}
                                                    id="debug"
                                                    checked={logType.debug}
                                                    onClick={(e) => {
                                                      setLogType({
                                                        ...logType,
                                                        debug: !logType.debug,
                                                      });
                                                    }}
                                                  />
                                                  Debug
                                                </label>
                                                <label
                                                  for="warn"
                                                  style={{
                                                    color: "#3E8BE2",
                                                    padding: "3px",
                                                  }}
                                                >
                                                  <input
                                                    type="checkbox"
                                                    id="warn"
                                                    checked={logType.warn}
                                                    onClick={(e) => {
                                                      setLogType({
                                                        ...logType,
                                                        warn: !logType.warn,
                                                      });
                                                    }}
                                                  />
                                                  Warn
                                                </label>
                                                <label
                                                  for="info"
                                                  style={{
                                                    color: "#3E8BE2",
                                                    padding: "3px",
                                                  }}
                                                >
                                                  <input
                                                    type="checkbox"
                                                    id="info"
                                                    checked={logType.info}
                                                    onClick={(e) => {
                                                      setLogType({
                                                        ...logType,
                                                        info: !logType.info,
                                                      });
                                                    }}
                                                  />
                                                  Info
                                                </label>
                                                <label
                                                  for="error"
                                                  style={{
                                                    color: "#3E8BE2",
                                                    padding: "3px",
                                                  }}
                                                >
                                                  <input
                                                    type="checkbox"
                                                    id="error"
                                                    checked={logType.error}
                                                    onClick={(e) => {
                                                      setLogType({
                                                        ...logType,
                                                        error: !logType.error,
                                                      });
                                                    }}
                                                  />
                                                  Error
                                                </label>
                                              </div>
                                            </div>
                                          </Col>
                                          {/* <div className="col">
                            <button type="button" onClick={filterOnLogType} style={{background:'#3E8BE2',fontWeight:'bold',float:'left',verticalAlign:'center', marginTop:'12%'}} className="btn btn-primary">Apply Filter</button>
                            </div> */}
                                          <Col>
                                            <button
                                              type="button"
                                              onClick={resetFilter}
                                              style={{
                                                background: "#3E8BE2",
                                                fontWeight: "bold",
                                                float: "left",
                                                verticalAlign: "center",
                                                marginTop: "10px",
                                              }}
                                              className="btn btn-primary"
                                            >
                                              Reset Filter
                                            </button>
                                          </Col>
                                        </Col>
                                      </Row>
                                    </Col>
                    
                                    <Col>
                                      <Row>
                                        <Col>
                                          <div className="multiselect">
                                            <div
                                              className="selectBox"
                                              style={{
                                                borderColor: "#3E8BE2",
                                                marginTop: "28px",
                                              }}
                                              onClick={showPagesRecord}
                                            >
                                              {/*
                                        <select
                                          style={{
                                            borderColor: "#3E8BE2",
                                            background: "none",
                                            color: "#3E8BE2",
                                            marginTop: "12%",
                                            borderRadius: "5px",
                                            height: "35px",
                                          }}
                                        >
                                      </select>*/}
                                              <option>Record Per Page</option>
                                              <div className="overSelect"></div>
                                            </div>
                                            <div
                                              id="PagesRecord"
                                              style={{
                                                borderColor: "#3E8BE2",
                                                background: "none",
                                                borderRadius: "5px",
                                              }}
                                            >
                                              <label
                                                for="10"
                                                style={{
                                                  color: "#3E8BE2",
                                                  padding: "3px",
                                                }}
                                              >
                                                <input
                                                  type="checkbox"
                                                  style={{
                                                    color: "#3E8BE2",
                                                    padding: "3px",
                                                  }}
                                                  id="10"
                                                  checked={record === 10}
                                                  onClick={(e) => {
                                                    setRecords(10);
                                                  }}
                                                />
                                                10
                                              </label>
                                              <label
                                                for="25"
                                                style={{
                                                  color: "#3E8BE2",
                                                  padding: "3px",
                                                }}
                                              >
                                                <input
                                                  type="checkbox"
                                                  id="25"
                                                  checked={record === 25}
                                                  onClick={(e) => {
                                                    setRecords(25);
                                                  }}
                                                />
                                                25
                                              </label>
                                              <label
                                                for="50"
                                                style={{
                                                  color: "#3E8BE2",
                                                  padding: "3px",
                                                }}
                                              >
                                                <input
                                                  type="checkbox"
                                                  id="50"
                                                  checked={record === 50}
                                                  onClick={(e) => {
                                                    setRecords(50);
                                                  }}
                                                />
                                                50
                                              </label>
                                              <label
                                                for="100"
                                                style={{
                                                  color: "#3E8BE2",
                                                  padding: "3px",
                                                }}
                                              >
                                                <input
                                                  type="checkbox"
                                                  id="100"
                                                  checked={record === 100}
                                                  onClick={(e) => {
                                                    setRecords(100);
                                                  }}
                                                />
                                                100
                                              </label>
                                            </div>
                                          </div>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Container>
                            {loading ? (
                              <SpinLoader />
                            ) : (
                              <>
                                {data && data.data && data.data.logs ? (
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
                                  <div>
                                    {/*
                                  
                                   <ToolkitProvider
                                      keyField="_id"
                                      data={data.data.logs}
                                      columns={columns}
                                      // noDataIndication="No data found"
                                      // pagination={ paginationFactory() }
                                      search
                                    >
                                  
                                  */}
                    
                                    {/*  
                                      {(props) => (
                                      
                                      */}
                                    <Row className="mt-5">
                                      {/*
                                            <BootstrapTable
                                            {...props.baseProps}
                                            noDataIndication="No data found"
                                            // pagination={ paginationFactory({
                                            //   // custom: true,
                                            //   sizePerPage:25,
                                            //   totalSize: data.data.logs.length
                                            // })
                                            // }
                                          />  
                                            
                    
                                        */}
                    
                                      {console.log("data", data.data.logs)}
                                      <Container style={{ marginLeft: "173px" }}>
                    
                                        {/*xustome table -----------------------------*/}
                                        <div className="divTable">
                                          <div className="headRow" style={{ borderTopLeftRadius: "25px", borderTopRightRadius: "25px" }}>
                                            <div className="divCellHead" >
                                              Mac address
                                              <i className={macAddressToggleIcon ? "fas fa-arrow-down" : "fas fa-arrow-up"} style={{ marginLeft: "10px" }} onClick={MacAddressToggle} ></i>
                                            </div>
                                            <div className="divCellHead divCellHeadBorder">Log Message
                                              <i className={logMessageToggleIcon ? "fas fa-arrow-down" : "fas fa-arrow-up"} style={{ marginLeft: "10px" }} onClick={LogMessageToggle} ></i>
                    
                                            </div>
                                            <div className="divCellHead divCellHeadBorder">Log Type</div>
                                            <div className="divCellHead divCellHeadBorder">Log Generated Date
                                              <i className={logGenratedToggleIcon ? "fas fa-arrow-down" : "fas fa-arrow-up"} style={{ marginLeft: "10px" }} onClick={LogGenratedToggle} ></i>
                                            </div>
                                            <div className="divCellHead divCellHeadBorder">Device Code
                                              <i className={deviceCodeToggleIcon ? "fas fa-arrow-down" : "fas fa-arrow-up"} style={{ marginLeft: "10px" }} onClick={DeviceCodeToggle} ></i>
                                            </div>
                                            <div className="divCellHead">Device Type
                                              <i className={deviceTypeToggleIcon ? "fas fa-arrow-down" : "fas fa-arrow-up"} style={{ marginLeft: "10px" }} onClick={DeviceTypeToggle} ></i>
                                            </div>
                                          </div>
                                          {data.data.logs.map((logsData) => {
                                            const deviceCode = logsData.device_types.split(
                                              "|",
                                              2
                                            )[0];
                                            const deviceName = logsData.device_types.split(
                                              "|",
                                              2
                                            )[1];
                    
                                            const oldDate = logsData.logGeneratedDate;
                                            const newDate = oldDate.substring(0, 10);
                                            return (
                                              <>
                                                <div className="divRow">
                                                  <div className="divCellRow">
                                                    <p
                                                      style={{
                                                        width: "200px",
                                                        overflow: "hidden",
                                                      }}
                    
                    
                    
                                                    >
                                                      {logsData.did}
                                                    </p>
                                                  </div>
                                                  <div className="divCellRow">
                                                    <p
                                                      style={{
                                                        width: "200px",
                                                        overflow: "hidden",
                                                      }}
                    
                    
                                                    >
                                                      <ReactReadMoreReadLess
                                                        charLimit={40}
                                                        readMoreText={"Read more ▼"}
                                                        readLessText={"Read less ▲"}
                                                      >
                                                        {logsData.logMsg}
                                                      </ReactReadMoreReadLess>
                                                    </p>
                                                  </div>
                                                  <div className="divCellRow" >
                                                    {logsData.logType}
                                                  </div>
                    
                    
                    
                    
                                                  <div className="divCellRow">{newDate}</div>
                                                  <div className="divCellRow">{deviceCode}</div>
                                                  <div className="divCellRow">{deviceName}</div>
                                                </div>
                                              </>
                                            );
                                          })}
                                        </div>
                                      </Container>
                    
                    
                    
                    
                    
                    
                    
                                      <Container style={{ marginLeft: "173px" }}>
                                        {!filterData.length ? (
                                          <p>No posts found</p>
                                        ) : (
                                          filterData.map(allData => <h3>{allData.updatedAt}</h3>)
                                        )}
                                      </Container>
                    
                    
                    
                    
                    
                    
                    
                    
                                    </Row>
                                    {/*
                                      </ToolkitProvider>
                                      */}
                                  </div>
                                ) : (
                                  <h2 style={{ color: "#212925", alignItems: "center" }}>
                                    No Log Available
                                  </h2>
                                )}
                                <Container style={{ marginLeft: "155px" }}>
                                  <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="Next >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={5}
                                    pageCount={data && data.data && data.data.count / record}
                                    // previousLabel="< Previous"
                                    renderOnZeroPageCount={null}
                                    containerClassName={"pagination"}
                                    pageClassName={"page-item"}
                                    pageLinkClassName={"page-link"}
                                    previousClassName={"page-item"}
                                    nextClassName={"page-item"}
                                    previousLinkClassName={"page-link"}
                                    nextLinkClassName={"page-link"}
                                  />
                                </Container>
                              </>
                            )}
                          </Container>
                          {/* </div> */}
                        </>
                      );
                    };
                    
                    export default NewLogTable;
                    
                    // garbage css table new table data
                    .divTable {
                      display: table;
                      width: auto;
                      border-spacing: 2px;
                      /*cellspacing:poor IE support for  this*/
                      /* border-collapse:separate;*/
                    }
                    
                    .headRow {
                      background-color: var(--iconBackgrounColor) !important;
                      height: 60px;
                      display: flex;
                     border: 1px solid rgb(206, 206, 206);
                      
                    }
                    
                    .divCellHead {
                      /*fix for  buggy browsers*/
                      display: flex !important;
                      justify-content: center;
                      align-items: center;
                      width: 150px;
                      color: #fff;
                      height: 100%;
                    }
                    .divCellHeadBorder{
                      box-shadow: 1px 1px 1px .1px rgba(184, 184, 184, 0.75);
                    }
                    
                    
                    .divRow {
                      display: flex;
                    }
                    
                    .divCellRow {
                      box-shadow: 1px 1px 1px .1px rgba(186, 186, 186, 0.75);
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      /*fix for  buggy browsers*/
                      width: 150px;
                    }
                    
                    @media (min-width: 1400px) {
                      .divCellHead {
                    
                        width: 190px;
                    
                      }
                    
                      .divCellRow {
                    
                        width: 190px;
                      }
                    }