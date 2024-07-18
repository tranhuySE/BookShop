import React, { useContext, useState } from "react";
import { Context } from "../context/ProductsProvider";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faSignInAlt,
  faUserPlus,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const { LoginUser } = useContext(Context);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await LoginUser(credentials);
    if (!success) {
      setError("Invalid username or password");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleSubmit}
        className="mt-4 p-4 border rounded bg-light"
        style={{ width: "500px" }}
      >
        <h2 className="text-center mb-4">Book Shop</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group mb-3">
          <div className="input-group">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              className="form-control"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>
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
        <button type="submit" className="btn btn-primary w-100 mb-3">
          <FontAwesomeIcon icon={faSignInAlt} /> Login
        </button>
        <div className="d-flex justify-content-around">
          <button
            className="btn btn-link"
            onClick={() => navigate("/register")}
          >
            <FontAwesomeIcon icon={faUserPlus} className="px-1" /> Register
          </button>
          <button
            className="btn btn-link"
            onClick={() => navigate("/forgot-password")}
          >
            <FontAwesomeIcon icon={faUnlockAlt} className="px-1" /> Forgot
            Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
