import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader-overlay">
        <div className="loader">
          Cargando
          <span />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader-overlay {
    position: fixed; /* Fijo para que esté siempre en la pantalla */
    top: 0;
    left: 0;
    width: 100%; /* Cubre todo el ancho de la pantalla */
    height: 100%; /* Cubre todo el alto de la pantalla */
    background: rgba(
      0,
      0,
      0,
      0.5
    ); /* Fondo semitransparente para dar un efecto de overlay */
    display: flex;
    justify-content: center; /* Centra el contenido horizontalmente */
    align-items: center; /* Centra el contenido verticalmente */
    z-index: 9999; /* Asegura que esté encima de otros elementos */
  }

  .loader {
    position: relative;
    width: 150px;
    height: 150px;
    background: transparent;
    border: 3px solid rgba(0, 102, 255, 0.1);
    border-radius: 50%;
    text-align: center;
    line-height: 150px;
    font-family: sans-serif;
    font-size: 20px;
    color: #0066ff;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-shadow: 0 0 10px #0066ff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }

  .loader::before {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top: 3px solid #0066ff;
    border-right: 3px solid #0066ff;
    border-radius: 50%;
    animation: animateC 2s linear infinite;
  }

  .loader span {
    display: block;
    position: absolute;
    top: calc(50% - 2px);
    left: 50%;
    width: 50%;
    height: 4px;
    background: transparent;
    transform-origin: left;
    animation: animate 2s linear infinite;
  }

  .loader span::before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #00aeff;
    top: -6px;
    right: -8px;
    box-shadow: 0 0 20px 5px #0066ff;
  }

  @keyframes animateC {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes animate {
    0% {
      transform: rotate(45deg);
    }
    100% {
      transform: rotate(405deg);
    }
  }
`;

export default Loader;
