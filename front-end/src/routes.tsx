import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import App from "./App";
import ListagemCadastro from "./components/Lista/listagem";
import FormularioCadastro from "./components/Formulario/FormularioCadastro";
import NavBar from "./components/NavBar/NavBar";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
function Routes() {

  return (
    <>
      <BrowserRouter>
        <Route path="/listagemCadastro" component={ListagemCadastro}></Route>
        <Route path="/register/:id" component={Register}></Route>
        <Route path="/" exact component={Login}></Route>
        <Route
          path="/formulario-cadastro"
          component={FormularioCadastro}
        ></Route>
      </BrowserRouter>
    </>
  );
}

export default Routes;
