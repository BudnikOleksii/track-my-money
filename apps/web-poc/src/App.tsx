import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import LoginPage from './features/auth/pages/LoginPage';
import SignupPage from './features/auth/pages/SignupPage';
import ProtectedRoute from './shared/components/ProtectedRoute';
import Layout from './shared/components/Layout';
import TransactionsPage from './features/transactions/pages/TransactionsPage';
import CategoriesPage from './features/categories/pages/CategoriesPage';
import ProfilePage from './features/profile/pages/ProfilePage';
import { ROUTES } from './shared/constants/routes';

const App = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path={ROUTES.AUTH.LOGIN}
        element={
          user ? <Navigate to={ROUTES.APP.HOME} replace /> : <LoginPage />
        }
      />
      <Route
        path={ROUTES.AUTH.SIGNUP}
        element={
          user ? <Navigate to={ROUTES.APP.HOME} replace /> : <SignupPage />
        }
      />
      <Route
        path={ROUTES.APP.HOME}
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TransactionsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default App;
