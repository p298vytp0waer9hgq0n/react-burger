import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

export default function Protected ({ children, path, auth, redirect, ...rest }) {
  const { getUser, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    getUser();
  }, []);

  if (user.isLoading) {
    return (
      <p>loading</p>
    )
  }

  if (user.hasError) {
    return (
      <p>error</p>
    )
  }

  const to = { pathname: location.state?.redirect || redirect };
  if (rest.comeback) to.state = { comeback: location.pathname };

  return (
    <Route path={path} {...rest} >
      { Boolean(user.userName) === auth ? children : <Redirect to={to} /> }
    </Route>
  );
}
