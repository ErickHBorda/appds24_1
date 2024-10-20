import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const baseUrl = "https://dev-erick-apirestv1.onrender.com/person/";

export const NewPerson = () => {
  const token = localStorage.getItem("token");

  const [dataPerson, setDataPerson] = useState({
    firstName: "",
    surName: "",
    dni: "",
    gender: null,
    birthDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Manejar el género como booleano
    if (name === "gender") {
      setDataPerson({
        ...dataPerson,
        [name]: value === "true",
      });
    } else {
      setDataPerson({
        ...dataPerson,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", dataPerson.firstName);
    formData.append("surName", dataPerson.surName);
    formData.append("dni", dataPerson.dni);
    formData.append("gender", dataPerson.gender);
    formData.append("birthDate", dataPerson.birthDate);

    try {
      const response = await axios.post(`${baseUrl}insert`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const responseData = response.data;
      console.log("Respuesta del servidor:", responseData);

      if (responseData.type === "success") {
        alert("Datos insertados correctamente");
      } else {
        alert("Error al insertar datos: " + responseData.message);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Hubo un problema al insertar los datos.");
    }
  };
  return (
    <>
      <div className="p-3">
        <div className="card">
          <div className="card-header">
            <h4>Registrar Datos</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label className="form-label">Nombres</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={dataPerson.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Apellidos</label>
                  <input
                    type="text"
                    className="form-control"
                    name="surName"
                    value={dataPerson.surName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">DNI</label>
                  <input
                    type="text"
                    className="form-control"
                    name="dni"
                    value={dataPerson.dni}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Género</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value={true}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Masculino</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value={false}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Femenino</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label className="form-label">Fecha de nacimiento</label>
                  <input
                    type="date"
                    className="form-control"
                    name="birthDate"
                    value={dataPerson.birthDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
