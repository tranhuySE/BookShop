import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faUserPlus,
  faLock,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "../context/ProductsProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [errorusername, setErrorUsername] = useState("");
  const [erroremail, setErroremail] = useState("");
  const { Ulist, Registers } = useContext(Context);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    if (name === "username") {
      const usernameExists = Ulist.some((user) => user.username === value);
      if (usernameExists) {
        setErrorUsername("Username already exists. Please choose another one.");
      } else {
        setErrorUsername("");
      }
    }
    if (name === "email") {
      const emailExists = Ulist.some((user) => user.email === value);
      if (emailExists) {
        setErroremail("Email already exists. Please choose another one.");
      } else {
        setErroremail("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataRegister = { id: Ulist.length + 1, ...userData, isAdmin: false };
    const re = Registers(dataRegister);
    if (re) {
      navigate("/login");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleSubmit}
        className="mt-4 p-4 border rounded bg-light"
        style={{ width: "500px" }}
      >
        <h2 className="text-center mb-4">New Account</h2>
        <div className="form-group mb-3">
          <div className="input-group">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              className="form-control"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group mb-3">
          <div className="input-group">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              className="form-control"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          {erroremail && <div className="text-danger mt-2">{erroremail}</div>}
        </div>
        <div className="form-group mb-3">
          <div className="input-group">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faUserPen} />
            </span>
            <input
              className="form-control"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>
          {errorusername && (
            <div className="text-danger mt-2">{errorusername}</div>
          )}
        </div>
        <div className="form-group mb-3">
          <div className="input-group">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={erroremail || errorusername !== ""}
        >
          <FontAwesomeIcon icon={faUserPlus} /> Register
        </button>
      </form>
    </div>
  );
};

export default Register;
