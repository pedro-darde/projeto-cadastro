import { BrowserRouter, Switch, Route } from "react-router-dom";
import CadastroProdutos from "./components/Formulario/CadastroProdutos";
import EditProduct from "./components/Formulario/EditProduct";
import FormularioCadastro from "./components/Formulario/FormularioCadastro";
import ListagemCadastro from "./components/Lista/listagem";
import ListarProdutos from "./components/Lista/ListagemProdutos";
import ForgotPassword from "./components/Login/ForgotPassword";
import Login from "./components/Login/Login";
import { PrivateRoute } from "./components/PrivateRoutes/PrivateRoute";
import Products from "./components/Products/Products";
import Error from "./components/RedirectErrors/Error404";
import Register from "./components/Register/Register";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/404" component={Error}></Route>
        <Route exact path="/" component={Login} />
        <Route
          path="/formulario-cadastro"
          component={FormularioCadastro}
        ></Route>
        <Route path="/editPassword" component={ForgotPassword}></Route>
        <PrivateRoute
          exact
          path="/listagem-produtos"
          component={ListarProdutos}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/produtos"
          component={Products}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/cadastro-produtos"
          component={CadastroProdutos}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/listagemCadastro"
          component={ListagemCadastro}
        />
        <PrivateRoute exact path="/produtos/:id" component={EditProduct}/>
        <PrivateRoute exact path="/register/:id" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
