import React, { useState, useEffect } from "react";
import Navbarr from "../ui/Navbarr";
import Style from "../../css/home.css";
import {
  faHome,
  faWrench,
  faCopy,
  faPlus,
  faArrowCircleRight,
  faSignOutAlt,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getAllProject } from "../../redux/action/ProjectAction";
import AddProjectModal from "../utils/AddProjectModal";
import SpinLoader from "../utils/SpinLoader";
import ProjectCard from "../utils/ProjectCard";
import { useHistory } from "react-router";

const Home = () => {
  const [modal, setModal] = useState(false);
  const Dispatch = useDispatch();
  const getAllProjectReducer = useSelector(
    (state) => state.getAllProjectReducer
  );
  const { loading, allProjectData } = getAllProjectReducer;

  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const { adminInfo } = adminLoginReducer;

  const navbardetail = {
    name: adminInfo.data.name,
    dashName: "Welcome",
    link1: {
      iconName: faHome,
      linkName: "Home",
      link: `/`,
    },
    link2: {
      iconName: faUserAlt,
      linkName: "Profile",
      link: `/`,
    },
  };
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("ddAdminToken")) {
      history.push("/");
    }
    Dispatch(getAllProject());
  }, []);

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <Navbarr navbardetails={navbardetail} />
      {loading ? (
        <SpinLoader />
      ) : (
        <Container>
          <Row style={{ marginLeft: "120px", marginTop: "120px" }}>
            {adminInfo.data && adminInfo.data.isSuperAdmin ? (
              <Col>
                <Card className={Style.addProjectButton}>
                  <Card.Body
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Card.Text>
                      <div className={Style.centerAddButton}>
                        <Button
                          style={{
                            borderRadius: "100%",
                            backgroundColor: "#1a83ff",
                          }}
                          className={`${Style.homedot} btn btn-secondary m-2`}
                          onClick={(e) => {
                            setModal(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                      </div>
                      <p style={{ fontWeight: "bold", color: "#1a83ff" }}>
                        Add Project
                      </p>
                      <AddProjectModal
                        show={modal}
                        onHide={() => setModal(false)}
                        closemodal={closeModal}
                      />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ) : (
              ""
            )}

            {/* <Col sm={4} > */}
            {/* <Card className="addProjectButton"> */}
            {/* <Card.Body className="addProjectButton"> */}

            {/* <Card.Title style={{textAlign:'left', color:'#212529'}}>Ventilator</Card.Title>
                        <Card.Subtitle style={{textAlign:'left'}} className="mb-2 text-muted">loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum </Card.Subtitle>
                        <Card.Text> */}
            {/* Some quick example text to build on the card title and make up the bulk of
                        the card's content. */}
            {/* </Card.Text> */}
            {/* <Card.Link href="#">Card Link</Card.Link> */}
            {/* <Card.Link className="leftLinkButton" href="#">{props.data.createdAt} </Card.Link> */}
            {/* <Link to={`#`}className="rightLinkButton"> <FontAwesomeIcon style={{fontSize:'200%'}}  className='fontAwesomeIconRight' icon={faArrowCircleRight} /> </Link> */}
            {/* </Card.Body> */}
            {/* </Card> */}
            {/* </Col> */}

            {allProjectData &&
              allProjectData.data.data.length &&
              allProjectData.data.data.map((datas) => (
                <ProjectCard data={datas} />
              ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Home;
