import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { AddUser } from "./components/AddUser";
import { Person } from "./components/Person";
import { NewPerson } from "./components/NewPerson";
import { Footer } from "./components/Footer";

export const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <>
      {user && <Navbar handleLogout={handleLogout} />}
      <div className="container">
        <Routes>
          {!user ? (
            <>
              <Route path="/" element={<Login onLogin={handleLogin} />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/new-user" element={<AddUser />} />
              <Route path="/clients" element={<Person/>}/>
              <Route path="/add-person" element={<NewPerson/>}></Route>
              <Route path="/*" element={<Navigate to="/home" />} />
            </>
          )}
        </Routes>
      </div>
      <Footer/>
    </>
  );
};
