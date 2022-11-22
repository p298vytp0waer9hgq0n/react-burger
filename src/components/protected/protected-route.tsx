import { useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import LoadingPage from "../../pages/loading";
import { getCookie } from "../../utils/get-cookie";

import { IProtectedProps, TLocationState } from "../../utils/types";

export default function ProtectedRoute ({ children, path, auth, redirect, ...rest }: IProtectedProps) {
  const { getUser, user: { isLoading, hasError } } = useAuth();
  const location = useLocation<TLocationState>();

  const hasAuth = Boolean(getCookie('refToken'));

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading && !location.state?.background) {
    return (
      <LoadingPage />
    )
  }

  if (hasError) {
    return (
      <p>error</p>
    )
  }

  const to = {...location, pathname: location.state?.redirect || redirect };
  if (rest.comeback) to.state = { comeback: location.pathname };

  return (
    <Route path={path} {...rest} >
      { hasAuth === auth ? children : <Redirect to={to} /> }
    </Route>
  );
}
