import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

export default function Protected ({ children, path, auth, redirect }) {
  const { getUser, user } = useAuth();

  useEffect(() => {
    getUser();
  }, [])

  if (user.isLoading) {
    return (
      <p>loading</p>
    )
  }

  return (
    <Route path={path}>
      { Boolean(user.userName) === auth ? children : <Redirect to={{ pathname: redirect }} /> }
    </Route>
  );
}
