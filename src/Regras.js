import React from "react";
import "./Confronto.css";
import Cabecalho from "./Components/Cabecalho";

const regras = [
  "Restando 3 pessoas, será feito um sorteio com todos os participantes eliminados nas fases anteriores e o sorteado ganhará uma vaga diretamente na semifinal;",
  "Restando 5 pessoas, será sorteado entre elas um para a 5º colocação automaticamente, porém receberá a mesma pontuação do 4º colocado. (Esta será a única situação em que o 5º também receberá pontuação);",
  "Sobrando 7 pessoas, será feito um sorteio com todos os participantes eliminados nas fases anteriores e o sorteado ganhará a vaga remanescente das quartas de final;",
  "Quanto tiver uma quantidade ímpar acima/igual de 7 pessoas, será sorteado entre eles. O sorteado passará diretamente para a próxima fase, seguindo posteriormente as regras dos itens 1, 2 ou 3, aquele no qual se enquadrar."
];

export default function Regras() {
  return (
    <div className="container-fluid p-0 fundo pb-3">
      <Cabecalho />
      <div className="container mt-5">
        <h1 className="text-center">Formato do chaveamento</h1>
        <p className="mt-5">
          Será realizado confrontos eliminatórios até sobrarem 4 pessoas para a
          disputa da semifinal. em casos divergentes, seguem-se as regras
          abaixo:
        </p>
        <ol>
          {regras.map(r => {
            return <li>{r}</li>;
          })}
        </ol>
      </div>
    </div>
  );
}
