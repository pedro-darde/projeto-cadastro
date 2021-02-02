import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest } : any) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("usuario") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/404",
            state: { from: props.location },
          }}
        />
      )
    }
  ></Route>
);
