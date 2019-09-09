import React, { Component } from "react";
import logo from "./classe.png";
import "./App.css";

import { Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inicio: false,
      nome: "",
      cont: 1,
      qtd: 0,
      jogadores: []
    };
  }

  iniciar = () => {
    this.setState({ inicio: !this.state.inicio });
  };

  handleNome = e => {
    this.setState({
      nome: e.target.value
    });
  };

  adicionar = e => {
    e.preventDefault();
    const { nome, cont, jogadores } = this.state;
    if (!nome) return;

    let jog = {
      nome: nome.trim(),
      ganhou: false,
      id: cont
    };

    let ncont = cont + 1;
    this.setState({
      jogadores: [...jogadores, jog],
      nome: "",
      cont: ncont
    });
  };

  render() {
    const { inicio, jogadores } = this.state;
    const go = jogadores.length !== 0 ? "/confronto" : "/";
    return (
      <div className="container-fluid p-0 App">
        <div className="vh-100 text-center align-self-center">
          <img src={logo} className="App-logo mt-2" alt="logo" />
          <h1 className="text-white mt-3">Confrontos EBD</h1>
          {!inicio && (
            <button className="btn btn-warning mt-2" onClick={this.iniciar}>
              Iniciar
            </button>
          )}
          {inicio && (
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
                          value={this.state.nome}
                          onChange={this.handleNome}
                        />
                      </div>
                      <div className="col-md-3 mt-sm-0 mt-2 mx-3 mx-sm-0">
                        <button
                          className="btn btn-warning w-100"
                          onClick={this.adicionar}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </form>
                  <Link
                    to={{
                      pathname: `${go}`,
                      state: {
                        jogadores
                      }
                    }}
                  >
                    <button className="btn btn-warning">Enviar</button>
                  </Link>
                </div>

                <div className="col-sm-6">
                  <h5 className="text-white my-3">Participantes</h5>
                  {jogadores.map(jog => {
                    return (
                      <div key={jog.id} className="mt-2 text-white">
                        <h6>
                          {" "}
                          {jog.id} - {jog.nome}
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
}

export default App;
