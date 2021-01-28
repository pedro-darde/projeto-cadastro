import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import * as md from "@material-ui/core";
import Routes from "./routes";

import FormularioCadastro from "./components/Formulario/FormularioCadastro";
import NavBar from "./components/NavBar/NavBar";
class App extends Component {
  render() {
    return (
      <>
        
        <Routes />
      </>
    );
  }
}
export default App;
