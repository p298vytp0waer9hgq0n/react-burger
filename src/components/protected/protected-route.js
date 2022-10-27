import { useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import LoadingPage from "../../pages/loading";

import PropTypes from 'prop-types';

export default function ProtectedRoute ({ children, path, auth, redirect, ...rest }) {
  const { getUser, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    getUser();
  }, []);

  if (user.isLoading) {
    return (
      <LoadingPage />
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

ProtectedRoute.propTypes = {
  children: PropTypes.any,
  path: PropTypes.string.isRequired,
  auth: PropTypes.bool.isRequired,
  redirect: PropTypes.string.isRequired
}
