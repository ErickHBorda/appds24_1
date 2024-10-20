import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start footer">
      <div
        className="text-center p-3"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          position: "fixed",
          bottom: "0",
          width: "100%",
          zIndex: "100",
        }}
      >
        © 2024 [eHCode] | Esta pagina fue desarrollada con la intención de mejorar mis habilidades en el Desarrolo de Software🧑‍💻
        <p className="d-block d-md-none" style={{ fontSize: "12px" }}>
          Puede que al iniciar demore en cargar, se paciente🙂
        </p>
        <p className="d-block d-md-none" style={{ fontSize: "12px" }}>
          Al salir de la página no olvides cerrar la sesión.
        </p>
      </div>
    </footer>
  );
};
