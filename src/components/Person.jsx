import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const baseUrl = "https://dev-erick-apirestv1.onrender.com/";

export const Person = () => {
  const [dataPerson, setDataPerson] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const getPerson = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}person/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataPerson(response.data.dto.listPerson);
    } catch (error) {
      console.error("Error al hacer la petición GET:", error);
      alert("Hubo un problema al intentar obtener los datos.");
    } finally {
      setLoading(false);
    }
  };

  const deleteP = async (idPerson) => {
    try {
      const response = await axios.delete(
        `${baseUrl}person/delete/${idPerson}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Respuesta de eliminar:", response.data);

      // Actualiza el estado después de eliminar
      setDataPerson(
        dataPerson.filter((person) => person.idPerson !== idPerson)
      );
    } catch (error) {
      console.log("Error al Eliminar: " + error);
    }
  };

  const handleEdit = (person) => {
    setSelectedPerson(person);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedPerson((prev) => ({
      ...prev,
      [name]: name === "gender" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("idPerson", selectedPerson.idPerson);
    formData.append("firstName", selectedPerson.firstName);
    formData.append("surName", selectedPerson.surName);
    formData.append("dni", selectedPerson.dni);
    formData.append("gender", selectedPerson.gender);
    formData.append("birthDate", selectedPerson.birthDate);

    console.log("Datos de selectedPerson:", selectedPerson);

    try {
      const response = await axios.post(`${baseUrl}person/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Respuesta de actualización:", response.data);

      setDataPerson((prev) =>
        prev.map((person) =>
          person.idPerson === selectedPerson.idPerson ? selectedPerson : person
        )
      );
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  useEffect(() => {
    getPerson();
  }, []);

  return (
    <>
      <h3>Lista de Personas Registradas</h3>
      <br />
      <NavLink to="/add-person" className="btn btn-success">
        Nueva Persona
      </NavLink>
      <br />
      <br />
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  Nombre
                </th>
                <th scope="col" className="text-center">
                  Apellido
                </th>
                <th scope="col" className="text-center">
                  DNI
                </th>
                <th scope="col" className="text-center">
                  Género
                </th>
                <th scope="col" className="text-center">
                  F. Nacimiento
                </th>
                <th scope="col" className="text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {dataPerson.map((person) => (
                <tr key={person.idPerson}>
                  <td className="text-center">{person.firstName}</td>
                  <td className="text-center">{person.surName}</td>
                  <td className="text-center">{person.dni}</td>
                  <td className="text-center">
                    {person.gender ? "Masculino" : "Femenino"}
                  </td>
                  <td className="text-center">
                    {new Date(person.birthDate).toLocaleDateString()}
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => handleEdit(person)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteP(person.idPerson)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modificar Datos
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Nombres</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={selectedPerson.firstName || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Apellidos</label>
                    <input
                      type="text"
                      className="form-control"
                      name="surName"
                      value={selectedPerson.surName || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">DNI</label>
                    <input
                      type="text"
                      className="form-control"
                      name="dni"
                      value={selectedPerson.dni || ""}
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
                        value="true"
                        checked={selectedPerson.gender === true}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">Masculino</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="false"
                        checked={selectedPerson.gender === false}
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
                      value={
                        selectedPerson.birthDate
                          ? selectedPerson.birthDate.split("T")[0]
                          : ""
                      }
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
