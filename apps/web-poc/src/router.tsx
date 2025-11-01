import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTES } from './shared/constants/routes';
import { useAppSelector } from './store/hooks';

import ProtectedRoute from './shared/components/ProtectedRoute';
import Layout from './shared/components/Layout';
import LoginPage from './features/auth/pages/LoginPage';
import SignupPage from './features/auth/pages/SignupPage';
import TransactionsPage from './features/transactions/pages/TransactionsPage';
import CategoriesPage from './features/categories/pages/CategoriesPage';
import ProfilePage from './features/profile/pages/ProfilePage';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((state) => state.auth);
  return user ? <Navigate to={ROUTES.APP.HOME} replace /> : <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: ROUTES.AUTH.LOGIN,
    element: (
      <AuthGuard>
        <LoginPage />
      </AuthGuard>
    ),
  },
  {
    path: ROUTES.AUTH.SIGNUP,
    element: (
      <AuthGuard>
        <SignupPage />
      </AuthGuard>
    ),
  },
  {
    path: ROUTES.APP.HOME,
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <TransactionsPage />,
      },
      {
        path: ROUTES.APP.CATEGORIES,
        element: <CategoriesPage />,
      },
      {
        path: ROUTES.APP.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },
]);
