import { useEffect, useRef } from 'react';
import { useAuth } from '../hooks/use-auth';

export default function LogoutPage () {
  const { logoutUser } = useAuth();

  const sentLogout = useRef(false);

  useEffect(() => {
    if (!sentLogout.current) logoutUser();
    return () => sentLogout.current = true;
  }, []);

  return (
    <></>
  );
}
