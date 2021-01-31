import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";
import App from "./App";
import ListagemCadastro from "./components/Lista/listagem";
import FormularioCadastro from "./components/Formulario/FormularioCadastro";
import NavBar from "./components/NavBar/NavBar";
import Register from "./components/Register/Register";
import Footer from "./components/Footer/Footer";
function Routes() {
  return (
    <BrowserRouter>
        <NavBar/>
        <Footer/>
        <Route path="/" exact component={FormularioCadastro}></Route>
        <Route path="/listagemCadastro" component={ListagemCadastro}></Route>
        <Route path="/register/:id" component={Register}></Route>
    </BrowserRouter>
  );
}

export default Routes;
