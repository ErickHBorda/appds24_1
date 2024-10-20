import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";

export const Navbar = ({ handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    // Obtener el objeto del usuario desde localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.nameUser);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          [eHCode]
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/new-user">
                Registrar Persona
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/clients">
                Clientes
              </NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {username && (
              <span className="navbar-text me-3 text-primary">
                {username}
              </span>
            )}
            <div className="nav-item dropdown" ref={dropdownRef}>
              <button
                className="btn btn-link nav-link dropdown-toggle"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
              >
                <img
                  src="/user.png"
                  alt="User"
                  className="rounded-circle"
                  width="30"
                  height="30"
                />
              </button>
              <ul
                className={`dropdown-menu ${dropdownOpen ? "show" : ""} ${
                  window.innerWidth < 768 ? "dropdown-menu-start" : "dropdown-menu-end"
                }`}
                style={{
                  position: "absolute",
                  right: window.innerWidth < 768 ? "auto" : 0,
                  left: window.innerWidth < 768 ? 0 : "auto",
                }}
              >
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
