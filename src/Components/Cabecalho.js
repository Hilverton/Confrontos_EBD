import React from "react";
import "./Cabecalho.css";
import LOGO from "./../classe.png";

const Cabecalho = () => {
  return (
    <div className="areaCabecalho">
      <div>
        <img src={LOGO} className="areaLogo" alt="logo" />
      </div>
    </div>
  );
};

export default Cabecalho;
