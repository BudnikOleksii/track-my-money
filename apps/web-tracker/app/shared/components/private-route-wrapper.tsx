'use client';

import { useEffect, useState, type FC, type PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/app/shared/hooks/use-auth';

export const PrivateRouteWrapper: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, refresh } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        try {
          await refresh(undefined).unwrap();
        } catch {
          router.push('/sign-in');
        }
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [isAuthenticated, refresh, router]);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
