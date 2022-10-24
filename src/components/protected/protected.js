import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

export default function Protected ({ children, path, auth, redirect, ...rest }) {
  const { getUser, user } = useAuth();

  useEffect(() => {
    getUser();
  }, [])

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

  return (
    <Route path={path} {...rest} >
      { Boolean(user.userName) === auth ? children : <Redirect to={{ pathname: redirect }} /> }
    </Route>
  );
}
