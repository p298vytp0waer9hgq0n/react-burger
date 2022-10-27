import { useEffect } from 'react';
import { useAuth } from '../hooks/use-auth';

export default function LogoutPage () {
  const { logoutUser } = useAuth();

  useEffect(() => {
    logoutUser();
  }, []);

  return (
    <></>
  );
}
