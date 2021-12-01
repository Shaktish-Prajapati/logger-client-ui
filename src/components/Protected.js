import React, { useEffect, useState } from "react";
import { IoMdTrendingUp } from "react-icons/io";
import { Route, useHistory, Redirect } from "react-router-dom";
// import { useHistory } from "react-router";

const Protected = ({ Component, ...rest }) => {
  const history = useHistory();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  console.log(localStorage.getItem("ddAdminToken"));

  // useEffect(() => {
  //   console.log("inside the useEffect");
    // if (!localStorage.getItem("ddAdminToken")) {
    //   setisLoggedIn(false)
    // }
    // if(localStorage.getItem("ddAdminToken")){
    //   setisLoggedIn(true)
    // }
  // }, []);
  return (
    <Route {...rest} render={
      // props => <Component {...rest} {...props} />
      props => {
        console.log(localStorage.getItem("ddAdminToken"))
        return localStorage.getItem("ddAdminToken") ? <Component {...props} /> : <Redirect path="/" />
      }
    } />
  );
};

export default Protected;
