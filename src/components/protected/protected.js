import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Protected ({ children, path }) {
  const { userName } = useSelector((store) => store.user);
  const { getUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function init() {
      await getUser();
    }

    init();
  }, [])

  useEffect(() => {
    if (userName) setIsLoading(false)
  }, [userName])

  if (isLoading) {
    return (
      <p>loading</p>
    )
  }

  return (
    <Route path={path}>
      { userName ? children : <Redirect to={{ pathname: '/login' }} /> }
    </Route>
  );
}
