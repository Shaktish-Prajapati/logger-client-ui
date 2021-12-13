import React, { useState, useEffect, useRef } from "react";
import Navbarr from "../ui/Navbarr";
// import ProjectSideBar from './ProjectSideBar'
import "../../css/NewLogTable.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  selectFilter,
  textFilter,
} from "react-bootstrap-table2-filter";
import {
  faHome,
  faWrench,
  faCopy,
  faPlus,
  faArrowCircleRight,
  faSignOutAlt,
  faUserAlt,
  faChartPie,
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
import { Col, Container, DropdownButton, Row } from "react-bootstrap";
import { CSVExport } from "react-bootstrap-table2-toolkit";
import ReactReadMoreReadLess from "react-read-more-read-less";
// import NewTable from './NewTable';

const { SearchBar } = Search;

function errorFormatter(cell, row) {
  if (row.logType) {
    return (
      <span>
        {cell === "error" ? (
          <strong style={{ color: "red" }}>{cell.toUpperCase()}</strong>
        ) : cell === "warn" ? (
          <strong style={{ color: "violet" }}>{cell.toUpperCase()}</strong>
        ) : cell === "info" ? (
          <strong style={{ color: "blue" }}>{cell.toUpperCase()}</strong>
        ) : cell === "verbose" ? (
          <strong style={{ color: "green" }}>{cell.toUpperCase()}</strong>
        ) : (
          <strong style={{ color: "orange" }}>{cell.toUpperCase()}</strong>
        )}
      </span>
    );
  }

  return <span>$ {cell} NTD</span>;
}

const { ExportCSVButton } = CSVExport;

const defaultSorted = [
  {
    dataField: "name",
    order: "desc",
  },
];

const columns = [
  {
    headerStyle: () => {
      return {
        width: "10%",
      };
    },
    dataField: "did",
    text: "Mac address",
    sort: true,
  },
  {
    dataField: "logMsg",
    text: "Log Message",
    headerAlign: "center",
    formatter: (col, row) => {
      return (
        <div style={{ width: 220, height: "auto", overflow: "hidden" }}>
          <ReactReadMoreReadLess
            charLimit={40}
            readMoreText={"Read more ▼"}
            readLessText={"Read less ▲"}
          >
            {col}
          </ReactReadMoreReadLess>
        </div>
      );
    },
    // style: { backgroundColor: 'green' }
  },
  {
    dataField: "logType",
    text: "Log Type",
    formatter: errorFormatter,
    sort: true,
  },
  {
    dataField: "logGeneratedDate",
    text: "Log Generated At",
    width: "20",
    formatter: (cell) => cell.split("T")[0],
    sort: true,
  },

  // {
  //     dataField: 'logGeneratedDate',
  //     text: 'Log Generated Time',
  //   //   filter: textFilter(),
  //     formatter: cell => cell.split("T")[1],
  //     sort:true
  //   },

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
  const [emptyDate, setEmptyDate] = useState(false);

  const startDateRef = useRef(null);
  const endDatRef = useRef(null);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const projectName = urlParams.get("name");
  const dispatch = useDispatch();
  const getAllLogByCodeReducer = useSelector(
    (state) => state.getAllLogByCodeReducer
  );
  const { loading, data } = getAllLogByCodeReducer;
  console.log(code);

  const refreshButton = () => {
    setDate("");
    setLogType({
      error: false,
      info: false,
      warn: false,
      debug: false,
      verbose: false,
    });
    dispatch(getProjectByCode(code));
  };

  const filterOnDate = () => {
    if (!date.start && !date.end) {
      return setEmptyDate(true);
    }
    dispatch(getProjectByCode(code, date));
    setEmptyDate(false);
  };

  const filterOnLogType = () => {
    console.log(logType);
    // dispatch(getProjectByCode(code,null,logType))
  };

  const resetFilter = () => {
    startDateRef.current.value = "";
    endDatRef.current.value = "";
    setDate("");
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
      iconName: faHome,
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

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
  };

  return (
    <>
      <Navbarr navbardetails={navbardetail} />
      // 1) before table loading contents here not to load on when filtering
      <Container>
        <div style={{ marginTop: "6%", width: "84%", float: "right" }}>
          {loading ? (
            <SpinLoader />
          ) : (
            <>
              {data && data.data && data.data.logs ? (
                <ToolkitProvider
                  keyField="_id"
                  data={data.data.logs}
                  columns={columns}
                  columnToggle
                  exportCSV={{ onlyExportSelection: true, exportAll: true }}
                  // noDataIndication="No data found"
                  // pagination={ paginationFactory() }
                  search
                >
                  {(props) => (
                    <div className="logtableStyle" className="mt-5">
                      <Row>
                        <Col>
                          {" "}
                          <SearchBar
                            style={{ width: "40%", display: "block" }}
                            {...props.searchProps}
                            placeholder="Enter filter..."
                          />
                        </Col>
                        <Col>
                          {" "}
                          <IoIcons.IoIosRefreshCircle
                            onClick={refreshButton}
                            className="refreshButton"
                          />
                        </Col>
                      </Row>

                      <div className="row">
                        <Col>
                          <Row>
                            <Col xl={12}>
                              {" "}
                              <label
                                style={{
                                  color: "#3E8BE2",
                                  fontWeight: "bold",
                                  float: "left",
                                }}
                              >
                                Start date{" "}
                              </label>
                              <input
                                type="date"
                                ref={startDateRef}
                                value={date.start}
                                onChange={(e) =>
                                  setDate({ ...date, start: e.target.value })
                                }
                                className={
                                  emptyDate
                                    ? "dateempty form-control"
                                    : "form-control"
                                }
                                style={{
                                  color: "#3E8BE2",
                                  fontWeight: "bold",
                                  float: "left",
                                }}
                              />
                            </Col>
                            <Col xl={12}>
                              {" "}
                              <label
                                style={{
                                  color: "#3E8BE2",
                                  fontWeight: "bold",
                                  float: "left",
                                }}
                              >
                                End date{" "}
                              </label>
                              <input
                                type="date"
                                ref={endDatRef}
                                max={Date.now()}
                                value={date.end}
                                onChange={(e) =>
                                  setDate({ ...date, end: e.target.value })
                                }
                                className={
                                  emptyDate
                                    ? "dateempty form-control"
                                    : "form-control"
                                }
                                style={{
                                  color: "#3E8BE2",
                                  fontWeight: "bold",
                                  float: "left",
                                }}
                              />
                            </Col>
                            <Col className="mt-3">
                              <Row className="text-center">
                                <Col>
                                  <button
                                    type="button"
                                    onClick={filterOnDate}
                                    className="btn btn-primary"
                                  >
                                    Apply date
                                  </button>
                                </Col>
                                <Col>
                                  <ExportCSVButton {...props.csvProps}>
                                    Export CSV
                                  </ExportCSVButton>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>

                        <div
                          className="col "
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Row>
                            <Col lg={12}>
                              <div
                                className="pagesOption"
                                style={{ marginTop: "33px" }}
                              >
                                <div
                                  className="selectBox pagesOption"
                                  /* style={{borderColor:'#3E8BE2', justifyContent:'center', alignItems:'center', display:'flex'}} */ onClick={
                                    showCheckboxes
                                  }
                                >
                                  <select
                                    style={{
                                      borderColor: "#3E8BE2",
                                      background: "none",
                                      color: "#3E8BE2",
                                      /* marginTop:'12%', */ borderRadius:
                                        "5px",
                                      height: "35px",
                                      justifyContent: "center",
                                      alignItems: "center",
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
                                    style={{ color: "#3E8BE2" }}
                                  >
                                    <input
                                      type="checkbox"
                                      style={{ color: "#3E8BE2" }}
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
                                    style={{ color: "#3E8BE2" }}
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
                                    style={{ color: "#3E8BE2" }}
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
                                    style={{ color: "#3E8BE2" }}
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

                            <Col lg={12}>
                              <Row className="mt-3">
                                <Col>
                                  <button
                                    type="button"
                                    onClick={resetFilter}
                                    className="btn btn-primary"
                                  >
                                    Reset Filter
                                  </button>
                                </Col>
                                <Col>
                                  <button
                                    type="button"
                                    onClick={resetFilter}
                                    className="btn btn-primary"
                                  >
                                    Save Filter
                                  </button>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>

                        <Col>
                          <div
                            className="col pagesOption"
                            style={{ marginTop: "35px" }}
                          >
                            <div className="pagesOption">
                              <div className="pagesOption">
                                <label for="10" style={{ color: "#3E8BE2" }}>
                                  <input
                                    type="checkbox"
                                    style={{ color: "#3E8BE2" }}
                                    id="10"
                                    checked={record === 10}
                                    onClick={(e) => {
                                      setRecords(10);
                                    }}
                                  />
                                  10
                                </label>
                                <label for="25" style={{ color: "#3E8BE2" }}>
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
                                <label for="50" style={{ color: "#3E8BE2" }}>
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
                                <label for="100" style={{ color: "#3E8BE2" }}>
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
                          </div>
                        </Col>
                      </div>

                      <p className="mt-2"></p>
                      <BootstrapTable
                        selectRow={selectRow}
                        filter={filterFactory()}
                        {...props.baseProps}
                        noDataIndication="No data found"
                        // pagination={ paginationFactory({
                        //   // custom: true,
                        //   sizePerPage:25,
                        //   totalSize: data.data.logs.length
                        // })
                        // }
                      />
                    </div>
                  )}
                </ToolkitProvider>
              ) : (
                <h2 style={{ color: "#212925", alignItems: "center" }}>
                  No Log Available
                </h2>
              )}
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
            </>
          )}
        </div>

        {/*
          
             <Container>
          <NewTable />
        </Container>

          */}
      </Container>
      {/* </div> */}
    </>
  );
};

export default NewLogTable;
