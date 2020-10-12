import React from "react";
import "./Lateral.css";

function Lateral({ eliminados }) {
  return (
    <div className="card rounded-0">
      <div className="card-body p-0 px-3 py-2">
        <h5 className="listaEli">Eliminados</h5>
        {!eliminados.length && <p>Nenhum eliminado!</p>}
        {eliminados.map((eli) => {
          return (
            <p key={eli.id} className="p-0 m-0">
              {eli.id} - {eli.name}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Lateral;
