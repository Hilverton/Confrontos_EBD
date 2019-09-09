import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Confronto from "./Confronto";
import Regras from "./Regras";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/confronto" exact component={Confronto} />
      <Route path="/regras" exact component={Regras} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
