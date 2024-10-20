import React, { useState } from "react";
import "../styles/login.css";
import axios from "axios";
import Loader from "../helpers/Loader";

const baseUrl = "https://dev-erick-apirestv1.onrender.com/";

export const Login = ({ onLogin }) => {
  const [data, setData] = useState({
    nameUser: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nameUser", data.nameUser);
    formData.append("password", data.password);

    try {
      setLoading(true);

      const response = await axios.post(`${baseUrl}user1/login`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseData = response.data;
      console.log("Respuesta del servidor:", responseData);

      if (responseData.type === "success") {
        // Guarda el token en localStorage
        localStorage.setItem("token", responseData.token);

        // Si la autenticación fue exitosa, pasamos los datos al App para que los gestione
        onLogin({
          idUser: responseData.dto.idUser,
          nameUser: responseData.dto.nameUser,
          token: responseData.token,
        });
      } else {
        alert(
          "Error en la autenticación: " + responseData.listMessage.join(", ")
        );
      }
    } catch (error) {
      console.error("Error al hacer la petición:", error);
      alert("Hubo un problema al intentar iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  const onHelp = () => {
    alert("Usuario: UserPro\nContraseña: password1");
  }

  return (
    <>
      {loading && <Loader />}
      <div className="wrapper">
        <div className="containerLogin">
          <form className="form" onSubmit={handleSubmit}>
            <p className="form-title">¡Bienvenido!</p>
            <div className="input-container">
              <input
                type="text"
                placeholder="Nombre de usuario"
                name="nameUser"
                value={data.nameUser}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Contraseña"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="submit">
              Iniciar sesión
            </button>
          </form>
          <div
            style={{
              textAlign: "center",
              fontSize: "10px",
              position: "relative",
              top: "20px",
            }}
          >
            <button
              style={{ color: "green", borderRadius: "10px", padding: "1.5px" }}
              onClick={onHelp}
            >
              obtener credenciales🔑
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
