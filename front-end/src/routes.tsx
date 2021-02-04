import { BrowserRouter, Switch, Route } from "react-router-dom";
import CadastroProdutos from "./components/Formulario/CadastroProdutos";
import FormularioCadastro from "./components/Formulario/FormularioCadastro";
import ListagemCadastro from "./components/Lista/listagem";
import ForgotPassword from "./components/Login/ForgotPassword";
import Login from "./components/Login/Login";
import { PrivateRoute } from "./components/PrivateRoutes/PrivateRoute";
import Error from "./components/RedirectErrors/Error404";
import Register from "./components/Register/Register";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/cadastro-produtos" component={CadastroProdutos}></Route>
        <Route exact path="/404" component={Error}></Route>
        <Route exact path="/" component={Login} />
        <Route path="/formulario-cadastro" component={FormularioCadastro}></Route>
        <Route path="/editPassword" component={ForgotPassword}></Route>
        <PrivateRoute
          exact
          path="/listagemCadastro"
          component={ListagemCadastro}
        />
        <PrivateRoute exact path="/register/:id" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
