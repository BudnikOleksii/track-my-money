import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { useRefreshMutation } from '../../store/api/authApi';
import { ROUTES } from '../constants/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const [refresh] = useRefreshMutation();
  const [isChecking, setIsChecking] = useState(!user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await refresh().unwrap();
      } catch {
        // Refresh failed, will redirect to login
      } finally {
        setIsChecking(false);
      }
    };

    if (!user) {
      checkAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user && isChecking) {
      setIsChecking(false);
    }
  }, [user, isChecking]);

  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
