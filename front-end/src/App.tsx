import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import * as md from "@material-ui/core";

import FormularioCadastro from "./components/Formulario/FormularioCadastro";
import NavBar from "./components/NavBar/NavBar";
class App extends Component {
  render() {
    return (
      <>
        <NavBar/>
      <md.Container component="div" maxWidth="sm" className="article-principal">
        <FormularioCadastro />
      </md.Container>
      </>
    );
  }
}
export default App;
