import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faEnvelope,
  faSignInAlt,
  faUserShield,
  faShoppingCart,
  faSearch,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "../context/ProductsProvider";

const Navbar = () => {
  const { handleSearch, user, Logout } = useContext(Context);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const onSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleLogout = () => {
    Logout();
    navigate("/");
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchInput);
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          BookShop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <FontAwesomeIcon icon={faInfoCircle} /> About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                <FontAwesomeIcon icon={faEnvelope} /> Contact
              </Link>
            </li>
            {user && user.isAdmin ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    <FontAwesomeIcon icon={faUserShield} /> Admin
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
          <form className="d-flex my-2 my-lg-0 mx-3" onSubmit={onSearchSubmit}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchInput}
              onChange={onSearchChange}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </button>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <FontAwesomeIcon icon={faShoppingCart} /> Cart
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <FontAwesomeIcon icon={faSignInAlt} /> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
