import React, { useState, useEffect } from "react";
import { faDatabase, faChartPie } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getLogTypeCounts,
  getLogByDate,
  getErrorWRTOS,
  getErrorWRTVersion,
} from "../../redux/action/ProjectAction";
import { Col, Row, Dropdown, DropdownButton, Container } from "react-bootstrap";
import { multiSelectFilter } from "react-bootstrap-table2-filter";

// todo : 1:2 custome imports

import Navbarr from "../ui/Navbarr";
import "../../css/Analytics.css";

import SpinLoader from "../utils/SpinLoader";
import PieCharts from "../utils/PieChart";
import LineGraphs from "../utils/LineGraphs";
import DonutChart from "../utils/DonutChart";
import OsArchitectureDonut from "../utils/OsArchitectureDonut";
import ErrorWithVersion from "../utils/ErrorWithVersion";

function Analytics() {
  const [date, setdate] = useState({
    start: null,
    end: null,
  });

  const filterOnDate = ({ startDate = null, endDate = null, diff = null }) => {
    console.log(diff);
    if (diff != null) {
      var dt = new Date();
      const endd = dt.toISOString().slice(0, 10);
      console.log(date);
      dt.setDate(dt.getDate() - diff);
      setdate({ start: dt.toISOString().slice(0, 10), end: endd });
      console.log(date);
    } else {
      console.log("Does not execute");
    }
  };
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  const projectName = urlParams.get("name");

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

  const dispatch = useDispatch();

  const dispatchmultiple = () => {
    dispatch(getLogTypeCounts(code));
    dispatch(getErrorWRTOS(code));
    dispatch(getErrorWRTVersion(code));
    dispatch(getLogByDate(code, date));
  };
  useEffect(() => {
    dispatchmultiple();
  }, [date]);
  return (
    <>
      <Navbarr navbardetails={navbardetail} />

      <Container>
        <div
          style={{
            marginTop: "2%",
            width: "84%",
            float: "right",
          }}
        >
          <Row>
            <Col style={{ width: "420px" }}>
              <Row>
                <Col>
                  <DonutChart />
                </Col>
              </Row>
              <Row style={{ marginTop: "-180px" }}>
                <Col>
                  <ErrorWithVersion />
                </Col>
              </Row>
              <Row style={{ marginTop: "-180px" }}>
                <Col>
                  <OsArchitectureDonut />
                </Col>
              </Row>
            </Col>
            <Col
              style={{
                marginTop: "235px",
                borderRadius: "1rem",
                boxShadow: "2px 2px 10px grey",
                height: "400px",
                paddingLeft: "25px",
                paddingRight: "25px",

                backgroundColor: "#1a83ff",
              }}
            >
              <Row className="mt-5">
                <Col>
                  <p style={{ color: "#fff" }}>Status :</p>
                </Col>
                <Col>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p
                      className="Active"
                      style={{
                        color: "#fff",
                        fontSize: "1.3rem",
                        fontWeight: "600",
                      }}
                    >
                      Active
                    </p>
                    <div className="Active-badge"></div>
                  </div>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col>
                  <p style={{ color: "#fff" }}>Project creation date :</p>
                </Col>
                <Col>
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "1.3rem",
                      fontWeight: "600",
                    }}
                  >
                    Monday, 13 December 2021
                  </span>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col>
                  <p style={{ color: "#fff" }}>Total devices connected :</p>
                </Col>
                <Col>
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "1.3rem",
                      fontWeight: "600",
                    }}
                  >
                    14
                  </span>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col>
                  <p style={{ color: "#fff" }}>Number of models :</p>
                </Col>
                <Col>
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "1.3rem",
                      fontWeight: "600",
                    }}
                  >
                    06
                  </span>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col>
                  <p style={{ color: "#fff" }}>
                    <p style={{ color: "#fff" }}>Models :</p>
                  </p>
                </Col>
                <Col>
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "1.3rem",
                      fontWeight: "600",
                    }}
                  >
                    Agva Pro
                  </span>
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "1.3rem",
                      fontWeight: "600",
                    }}
                  >
                    , Agva Advanced
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Container>
            <Row>
              <Col className=" d-flex justify-content-center align-items-center">
                <label
                  style={{
                    color: "#3E8BE2",
                    fontWeight: "bold",
                    float: "left",
                  }}
                >
                  Start date
                  <input
                    type="date"
                    value={date.start}
                    onChange={(e) =>
                      setdate({ ...date, start: e.target.value })
                    }
                    className="form-control"
                    style={{
                      color: "#3E8BE2",
                      fontWeight: "bold",
                      float: "left",
                    }}
                  />
                </label>
              </Col>
              <Col className=" d-flex justify-content-center align-items-center">
                <label
                  style={{
                    color: "#3E8BE2",
                    fontWeight: "bold",
                    float: "left",
                  }}
                >
                  End date
                  <input
                    type="date"
                    max={Date.now}
                    value={date.end}
                    onChange={(e) => setdate({ ...date, end: e.target.value })}
                    className="form-control"
                    style={{
                      color: "#3E8BE2",
                      fontWeight: "bold",
                      float: "left",
                    }}
                  />
                </label>
              </Col>
              <Col
                className=" d-flex justify-content-center align-items-center mt-3"
                style={{ position: "relative", zIndex: 5 }}
              >
                <DropdownButton
                  id="dropdown"
                  title="Select duration"
                  bg="light"
                >
                  {/* <Dropdown.Item onClick={()=>{setdate({start:Date.now, end:Date().setDate(Date.now - 3)})}}>3 Days</Dropdown.Item> */}
                  <Dropdown.Item onClick={() => filterOnDate({ diff: 5 })}>
                    5 Days
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => filterOnDate({ diff: 7 })}>
                    Week
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => filterOnDate({ diff: 30 })}>
                    Month
                  </Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center">
              <Col>
                <LineGraphs />
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default Analytics;
