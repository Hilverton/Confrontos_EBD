import React, { Component } from "react";
import "./Fase.css";

class Fase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duplas: this.props.duplas,
      part: this.props.part,
      enviar: false
    };
  }

  clique = (id, index) => {
    let resultado = this.state.duplas;
    let valor;
    if (resultado[index].p1.id === id) {
      valor = resultado[index].p1.ganhou;
      resultado[index].p1.ganhou = !valor;
    } else {
      valor = resultado[index].p2.ganhou;
      resultado[index].p2.ganhou = !valor;
    }
    this.setState({
      duplas: resultado
    });
  };

  finaliza = () => {
    console.log("resultado: ", this.state.duplas);
    this.props.altera(this.state.duplas);
  };
  render() {
    const { part, duplas, enviar } = this.state;
    return (
      <div className="bg-white mb-4">
        <h3 className="ml-4 py-2">FASE {this.props.fase}</h3>
        <div className="container">
          <div className="row justify-content-center p-0 mx-4">
            {part.map((p, index) => {
              return (
                <div
                  key={index}
                  className="col-sm-3 border text-center align-items-center m-1"
                >
                  <p className="m-0 p-2">
                    {p.id} - {p.nome}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card border-0">
          <div className="card-body p-0 px-3 py-2">
            <div className="row group p-2 mx-2">
              {duplas.map((d, index) => {
                let cor1 = d.p1.ganhou ? "bg-success" : "";
                let cor2 = d.p2.ganhou ? "bg-success" : "";
                return (
                  <div key={index} className="col-sm my-3">
                    <div className="d-flex flex-column dupla text-center p-0">
                      <p
                        onClick={() => this.clique(d.p1.id, index)}
                        className={`mt-2 m-0 ${cor1} mx-2`}
                      >
                        {d.p1.id} - {d.p1.nome}
                      </p>
                      <p className="mt-2 m-0">X</p>
                      <p
                        onClick={() => this.clique(d.p2.id, index)}
                        className={`mt-2 m-0 ${cor2} mb-2 mx-2`}
                      >
                        {d.p2.id} - {d.p2.nome}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {!enviar && (
              <button
                className="btn btn-warning mt-2 mb-2"
                onClick={() => this.finaliza()}
              >
                Finalizar
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Fase;
