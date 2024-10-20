import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export const Navbar = ({ handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    // Obtener el objeto del usuario desde localStorage
    const storedUser = localStorage.getItem('user'); // Asegúrate de que 'user' sea la clave correcta que usas para almacenar el objeto
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.nameUser); // Asigna el valor de nameUser al estado
    }
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
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/new-user">
                Regitrar Persona
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/clients">
                Clientes
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-item dropdown">
          <button
            className="btn btn-link nav-link dropdown-toggle"
            onClick={toggleDropdown}
            aria-expanded={dropdownOpen}
          >
            <img
              src="/user.png" // Cambia esta URL por la de la imagen de perfil del usuario
              alt="User"
              className="rounded-circle"
              width="30"
              height="30"
            />
          </button>
          <ul
            className={`dropdown-menu dropdown-menu-end ${
              dropdownOpen ? "show" : ""
            }`}
            style={{ right: 0 }}
          >
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                Cerrar sesion
              </button>
            </li>
            <div className="container"></div>
          </ul>
        </div>
        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="text-primary ">{username}</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
