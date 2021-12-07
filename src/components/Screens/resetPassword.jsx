import React, { useState } from "react";
import { Link } from "react-router-dom";
// opt inputs
import OtpInput from "react-otp-input";

export default function ResetPassword() {
  const [state, setState] = useState({ opt: "" });

  const handleChange = (otp) => setState({ otp });

  return (
    <>
      <div
        data-testid="login-test"
        className="Login-card justify-content-center mt-5"
      >
        <div className="Login-title">
          <p
            className='className="d-flex justify-content-center'
            style={{ fontSize: "3rem" }}
          >
            Reset Password
          </p>
        </div>

        <div className="mb-5 p-5">
          {/*OTP section*/}
          <div>
            <p style={{ fontSize: "2rem", color: "#3E8BE2" }}>Enter your OTP</p>
            <div className="d-flex" style={{ width: "60%" }}>
              <OtpInput
                value={state.otp}
                onChange={handleChange}
                numInputs={6}
                inputStyle={{
                  borderRadius: "10px",
                  border: "2px solid #3E8BE2 ",
                  width: "30px",
                  height: "30px",
                }}
                separator={<span></span>}
              />
            </div>
          </div>
          <div className="mb-3 mt-5">
            <input
              type="password"
              autocomplete="one-time-code"
              className="form-control LoginForminput "
              id="exampleInputEmail1"
              placeholder="Enter your new password"
              aria-describedby="emailHelp"
              style={{ paddingLeft: "25px" }}
            />
            <span>
              <i className="fas fa-lock icon-left"></i>
            </span>
            <input
              type="password"
              className="form-control LoginForminput "
              id="exampleInputEmail1"
              placeholder="Confime your new password"
              aria-describedby="emailHelp"
              style={{ paddingLeft: "25px" }}
            />
            <span>
              <i className="fas fa-lock icon-left"></i>
            </span>
          </div>
          <Link to="/">
            <button
              type="submit"
              style={{
                background: "#3E8BE2",
                color: "#fff",
                borderRadius: "10px",
                fontStyle: "normal normal 600 23px/34px Poppins;",
              }}
              className="btn col w-50"
              onClick={() => {}}
            >
              Submit
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
