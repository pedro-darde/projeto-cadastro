import { BrowserRouter, Route } from "react-router-dom";
import ListagemCadastro from "./components/Lista/listagem";
import FormularioCadastro from "./components/Formulario/FormularioCadastro";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
function Routes() {
  const {token}  = JSON.parse(localStorage.getItem('usuario') !)
  
  
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
