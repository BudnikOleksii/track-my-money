'use client';

import { useEffect, useState, type FC, type PropsWithChildren } from 'react';

import { Loader } from '@track-my-money/ui/src/components/atoms/loader/Loader';

import { useRouter } from '@/src/navigation/navigation';
import { useAuth } from '@/src/shared/hooks/use-auth';
import { ROUTES } from '@/src/shared/constants/routes';

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
          router.push(ROUTES.signIn);
        }
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [isAuthenticated, refresh, router]);

  if (isChecking) {
    return <Loader size="lg" />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
