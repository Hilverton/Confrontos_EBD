import React from "react";
import "./Cabecalho.css";
import LOGO from "./../classe.png";
import { Link } from "react-router-dom";

function Cabecalho() {
  return (
    <div className="areaCabecalho">
      <Link to="/">
        <img src={LOGO} className="areaLogo" alt="logo" />
      </Link>
    </div>
  );
}

export default Cabecalho;
