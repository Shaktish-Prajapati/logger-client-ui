import React from "react";
import "../css/Register.css";

const Register = () => {
  return (
    <div className="cardRegister">
      <h1 className="title mt-5">Register</h1>
      <p className="description mt-3">
        Welcome back! login With your data that you entered during registration
      </p>
      <form>
        <div className="outer">
          <div className="form-group ">
            <input
              type="text"
              className="form-control inputTag"
              placeholder="Enter Your name"
            />
            <i className="fas fa-user iconFa"></i>
          </div>
          <div className="form-group ">
            <input
              type="email"
              className="form-control inputTag"
              placeholder="Enter Your email"
            />
            <i className="fas fa-envelope iconFa"></i>
          </div>
          <div className="form-group ">
            <input
              type="password"
              className="form-control inputTag"
              placeholder="Password"
            />
            <i className="fas fa-unlock-alt iconFa"></i>
            <i className="fas fa-eye-slash iconEye"></i>
          </div>
          <div className="form-group ">
            <input
              type="password"
              className="form-control inputTag"
              placeholder="Confirm password"
            />
            <i className="fas fa-unlock-alt iconFa"></i>
          </div>
          <div className="form-check mb-3 mr-sm-2">
            <input
              className="form-check-input labelTick"
              type="checkbox"
              id="inlineFormCheck"
            />
            <label className="form-check-label agree">
              I agree to the Terms and Conditions
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-register mt-3 mb-5"
            style={{ textAlign: "center", display: "block" }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
