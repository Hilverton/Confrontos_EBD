import React, { Component } from "react";
import Cabecalho from "./Components/Cabecalho";
import Lateral from "./Components/Lateral";
import Fase from "./Components/Fase";
import "./Confronto.css";
import cup from "./cup.png";

class Confronto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      botao: false,
      confronto: [],
      participantes: this.props.location.state.jogadores,
      fases: 1,
      eliminados: [],
      sorteado: "",
      elim_impar: "",
      nomeElim_impar: "",
      cinco: "",
      nomeCinco: ""
    };
  }
  //===================== Impede o f5 por engano
  componentDidMount() {
    window.addEventListener("beforeunload", this.beforeunload.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.beforeunload.bind(this));
  }

  beforeunload(e) {
    e.preventDefault();
    e.returnValue = true;
  }
  //====================
  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  sorteio = tam => {
    let sort,
      verif,
      valores = [];
    for (let i = 0; i < tam; i++) {
      sort = this.getRandomInt(0, tam);
      verif = valores.includes(sort);
      if (!verif) {
        valores.push(sort);
      } else {
        i--;
      }
    }
    return valores;
  };

  formacao = (tam, array, valores) => {
    let confronto = [];
    for (let i = 0; i < tam; i = i + 2) {
      let dupla = {
        p1: array[valores[i]],
        p2: array[valores[i + 1]]
      };
      confronto.push(dupla);
    }
    return confronto;
  };

  regraDos5 = (tam, array) => {
    let quinto, nomeQuinto;
    let sort = this.getRandomInt(0, tam);
    quinto = array[sort];
    nomeQuinto = quinto.nome;
    array.splice(sort, 1);
    this.setState({
      cinco: quinto,
      nomeCinco: nomeQuinto
    });
    return array;
  };

  duplas = () => {
    let p = this.state.participantes;
    let b = this.state.botao;
    let tam = p.length;
    let proximaFase, nome;

    if (tam === 5) {
      p = this.regraDos5(tam, p);
    }

    if (tam >= 7 && tam % 2 !== 0) {
      let sort = this.getRandomInt(0, tam);
      proximaFase = p[sort];
      nome = proximaFase.nome;
      p.splice(sort, 1);
    }

    p = this.renumeracao(p);

    tam = p.length;
    let valores = this.sorteio(tam);
    let conf = this.formacao(tam, p, valores);

    this.setState({
      confronto: conf,
      botao: !b,
      participantes: p,
      elim_impar: proximaFase,
      nomeElim_impar: nome
    });
  };

  limpar = (array, bool) => {
    let ret = array.map(arr => {
      if (arr.p1.ganhou === bool) return arr.p1;
      if (arr.p2.ganhou === bool) return arr.p2;
    });
    return ret;
  };

  perderam = (array, bool) => {
    let perd = this.limpar(array, bool);
    let { eliminados } = this.state;
    for (let p of perd) {
      p.id = eliminados.length + 1;
      eliminados.push(p);
    }
    eliminados = this.renumeracao(eliminados);
    this.setState({ eliminados });
    return eliminados;
  };

  renumeracao = array => {
    for (let i = 0; i < array.length; i++) {
      array[i].id = i + 1;
      array[i].ganhou = false;
    }
    return array;
  };

  altera = array => {
    const { botao, fases } = this.state;
    this.setState({
      botao: !botao,
      sorteado: ""
    });
    let eliminados = this.perderam(array, false);
    let c = this.limpar(array, true);
    let tam = c.length;
    let elim = this.state.nomeElim_impar;
    //verifica se já tem eliminados para colocá-lo pra formação das novas duplas
    if (elim) {
      console.log("elim por impar: ", this.state.elim_impar);
      c.push(this.state.elim_impar);
      console.log("adicionado o elim_impar. Total de c: ", c);
      this.setState({
        elim_impar: "",
        nomeElim_impar: ""
      });
    }
    tam = c.length;
    if (tam % 2 !== 0 && tam !== 5 && tam > 2 && eliminados.length !== 0) {
      console.log("sorteio para os que estão na lista de eliminados");
      let um = this.getRandomInt(0, eliminados.length);
      let outro = eliminados[um];
      eliminados.splice(um, 1);
      eliminados = this.renumeracao(eliminados);
      outro.ganhou = false;
      const nome = outro.nome;
      c.push(outro);
      this.setState({
        sorteado: nome,
        eliminados: eliminados
      });
      eliminados = 0;
    }
    tam = c.length;

    c = this.renumeracao(c);

    this.setState({
      participantes: c,
      fases: fases + 1
    });
  };

  render() {
    const {
      confronto,
      botao,
      participantes,
      eliminados,
      fases,
      sorteado,
      nomeElim_impar,
      nomeCinco
    } = this.state;

    return (
      <div className="container-fluid p-0 fundo">
        <Cabecalho />
        <div className="container">
          <div className="row justify-content-around pt-3">
            <div className="col-md-3 mt-3 mt-md-0 ">
              <Lateral eliminados={eliminados} />
            </div>
            <div className="col-md-8 mt-3 mt-md-0">
              {sorteado && (
                <div className="alert alert-success" role="alert">
                  O {sorteado} foi eliminado na fase anterior mas sorteado para
                  completar o chaveamento
                </div>
              )}
              {nomeElim_impar && (
                <div className="alert alert-info" role="alert">
                  O {nomeElim_impar} foi sorteado e passará direto para a
                  próxima fase por haver uma quantidade ímpar de participantes
                  segundo a regra 4
                </div>
              )}
              {nomeCinco && (
                <div className="alert alert-danger" role="alert">
                  O {nomeCinco} foi sorteado e passou direto para o 5º lugar
                  segundo a regra 2
                </div>
              )}
              {!botao && participantes.length !== 1 && (
                <button
                  className="btn btn-warning mt-2 mb-2"
                  onClick={this.duplas}
                >
                  Gerar Duplas
                </button>
              )}

              {botao && participantes.length !== 1 && (
                <Fase
                  duplas={confronto}
                  part={participantes}
                  altera={this.altera}
                  fase={fases}
                />
              )}
              {participantes.length === 1 && (
                <div className="text-center bg-white mb-4">
                  <img src={cup} className="trofeu mt-3" alt="troféu" />
                  <h1 className="my-4">Ganhador: {participantes[0].nome}</h1>
                  <div>
                    Icons made by{" "}
                    <a
                      href="https://www.flaticon.com/authors/freepik"
                      title="Freepik"
                    >
                      Freepik
                    </a>{" "}
                    from{" "}
                    <a href="https://www.flaticon.com/" title="Flaticon">
                      www.flaticon.com
                    </a>{" "}
                    is licensed by{" "}
                    <a
                      href="http://creativecommons.org/licenses/by/3.0/"
                      title="Creative Commons BY 3.0"
                    >
                      CC 3.0 BY
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Confronto;
/*
<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
*/
