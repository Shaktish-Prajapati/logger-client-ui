import React, { useState } from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "../../css/Navbarr.css";

import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/action/AdminAction";
import { useHistory } from "react-router";
import Button from "@restart/ui/esm/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Navbarr = (props) => {
  const [sidebar, setSidebar] = useState(false);
  const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
  const [navToggle, setNavToggle] = useState(true);
  const { loading, adminInfo } = adminLoginReducer;

  const showSidebar = () => setSidebar(!sidebar);
  const dispatch = useDispatch();
  let history = useHistory();
  const handlelogout = (e) => {
    e.preventDefault();
    dispatch(adminLogout(history));
  };

  const currentRoute = useHistory().location.pathname.toLowerCase();
  console.log(currentRoute);

  // navigation toogle
  const navToggleFun = () => {
    if (navToggle) {
      return setNavToggle(false);
    }
    return setNavToggle(true);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#1a83ff" }}>
        <div className="navbarr">
          <h2 className="titleNavbar" style={{ color: "#1a83ff" }}>
            {props.navbardetails.dashName}
          </h2>
          <div
            onClick={(e) => {
              handlelogout(e);
            }}
            className="logoutNavbar"
            style={{ color: "#1a83ff" }}
          >
            {" "}
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </div>
        </div>
        {/*navigation toggle */}

        <nav className={navToggle ? "nav-menu" : "nav-menu-toggle"}>
          <FontAwesomeIcon
            icon={faPlus}
            onClick={navToggleFun}
            className=" toggle_button"
          />
          <ul onClick={showSidebar}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: ".8rem",
              }}
            >
              <Link to="/" style={{ cursor: "hide", textDecoration: "none" }}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div className="sidebar_avatar">
                    <div
                      className="sidebar_avatar__letters"
                      style={{ textDecoration: "none" }}
                    >
                      {props.navbardetails.name
                        .split(" ")
                        .map((name) => name[0][0].toUpperCase())}
                    </div>
                  </div>
                </div>

                {/*toggle */}

                {navToggle ? (
                  <>
                    <p className="name-avatar"> {props.navbardetails.name} </p>
                    <p className="name-email">saman@gmail.com</p>
                  </>
                ) : null}
              </Link>
            </div>

            {console.log(props.navbardetails.link1.iconName)}
            <section className="nav-link-outer-sec">
              <Link
                to={
                  props.navbardetails.link1 &&
                  props.navbardetails.link1.link &&
                  props.navbardetails.link1.link.length == 0
                    ? ""
                    : props.navbardetails.link1.link
                }
                className={
                  currentRoute.includes("home") ||
                  currentRoute.includes("newlogtable")
                    ? "nav-text active"
                    : "nav-text"
                }
              >
                <FontAwesomeIcon
                  style={{ marginRight: "8px" }}
                  icon={props.navbardetails.link1.iconName}
                />

                {props.navbardetails.link1.linkName}
              </Link>
              <Link
                to={
                  props.navbardetails.link2 &&
                  props.navbardetails.link2.link &&
                  props.navbardetails.link2.link.length === 0
                    ? ""
                    : props.navbardetails.link2.link
                }
                className="nav-text "
              >
                <FontAwesomeIcon
                  style={{ marginRight: "8px" }}
                  icon={props.navbardetails.link2.iconName}
                />{" "}
                {props.navbardetails.link2.linkName}{" "}
              </Link>
            </section>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbarr;
