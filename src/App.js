import React, { useState } from "react";
import logo from "./classe.png";
import "./App.css";

import { Link } from "react-router-dom";

function App() {
  const [start, setStart] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [count, setCount] = useState(1);
  const [players, setPlayers] = useState([]);

  function begin() {
    setStart(!start);
  }

  function handleNome(e) {
    setPlayerName(e.target.value);
  }

  function add(e) {
    e.preventDefault();
    if (!playerName) return;

    let player = {
      name: playerName.trim(),
      won: false,
      id: count
    };

    setPlayers([...players, player]);
    setPlayerName("");
    setCount(count + 1);
  }

  const go = players.length !== 0 ? "/confronto" : "/";
  return (
    <div className="container-fluid p-0 App">
      <div className="vh-100 text-center align-self-center">
        <img src={logo} className="App-logo mt-2" alt="logo" />
        <h1 className="text-white mt-3">Confrontos EBD</h1>
        {!start && (
          <button className="btn btn-warning mt-2" onClick={begin}>
            Iniciar
          </button>
        )}
        {start && (
          <div className="container">
            <Link to="/regras">
              <h6 className="text-white">Regras</h6>
            </Link>
            <div className="row">
              <div className="col-md-6">
                <form>
                  <h5 className="text-white my-3">Nome do Jogador</h5>
                  <div className="form-group row text-white justify-content-center mt-2">
                    <div className="col-sm-8 mx-3 mx-sm-0">
                      <input
                        type="text"
                        className="form-control"
                        value={playerName}
                        onChange={handleNome}
                      />
                    </div>
                    <div className="col-md-3 mt-sm-0 mt-2 mx-3 mx-sm-0">
                      <button className="btn btn-warning w-100" onClick={add}>
                        Adicionar
                      </button>
                    </div>
                  </div>
                </form>
                <Link
                  to={{
                    pathname: `${go}`,
                    state: {
                      players
                    }
                  }}
                >
                  <button className="btn btn-warning">Enviar</button>
                </Link>
              </div>

              <div className="col-sm-6">
                <h5 className="text-white my-3">Participantes</h5>
                {players.map((jog) => {
                  return (
                    <div key={jog.id} className="mt-2 text-white">
                      <h6>
                        {" "}
                        {jog.id} - {jog.name}
                      </h6>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
