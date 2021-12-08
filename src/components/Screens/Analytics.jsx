import React, { useState, useEffect } from "react";
import { faDatabase, faChartPie } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getLogTypeCounts,
  getLogByDate,
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
    dispatch(getLogByDate(code, date));
  };
  useEffect(() => {
    dispatchmultiple();
  }, [date]);
  return (
    <>
      <Navbarr navbardetails={navbardetail} />
      <div style={{ marginTop: "120px" }}>
        <Container>
          <Row>
            <Col
              sm={12}
              md={4}
              lg={3}
              xl={3}
              className="card-Custome"
              style={{ width: "420px" }}
            >
              <DonutChart />
            </Col>
            <Col
              sm={12}
              md={4}
              lg={3}
              xl={3}
              className="card-Custome"
              style={{ width: "420px" }}
            >
              <DonutChart />
            </Col>
            <Col
              sm={12}
              md={4}
              lg={3}
              xl={3}
              className="card-Custome"
              style={{ width: "420px" }}
            >
              {/* <PieCharts /> */}
              <DonutChart />
            </Col>
          </Row>
          <Row>
            <Col className="card-Custome d-flex justify-content-center align-items-center">
              <label
                style={{ color: "#3E8BE2", fontWeight: "bold", float: "left" }}
              >
                Start date
                <input
                  type="date"
                  value={date.start}
                  onChange={(e) => setdate({ ...date, start: e.target.value })}
                  className="form-control"
                  style={{
                    color: "#3E8BE2",
                    fontWeight: "bold",
                    float: "left",
                  }}
                />
              </label>
            </Col>
            <Col className="card-Custome d-flex justify-content-center align-items-center">
              <label
                style={{ color: "#3E8BE2", fontWeight: "bold", float: "left" }}
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
              className="card-Custome d-flex justify-content-center align-items-center"
              style={{ position: "relative", zIndex: 5 }}
            >
              <DropdownButton id="dropdown" title="Select duration" bg="light">
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
          <Row className="card-Custome">
            <Col>
              <LineGraphs />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Analytics;
