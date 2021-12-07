import React from "react";
import { Link } from "react-router-dom";

export default function FrogotPassowrd() {
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
            Forgot Password
          </p>
        </div>
        <div className="mb-5 p-5">
          <div className="mb-3">
            <input
              type="email"
              className="form-control LoginForminput "
              id="exampleInputEmail1"
              placeholder="Enter your email"
              aria-describedby="emailHelp"
              style={{ paddingLeft: "25px" }}
            />
            <span>
              <i className="fas fa-envelope icon-left"></i>
            </span>
          </div>
          <Link to="/resetPassword">
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
              Send an email
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
