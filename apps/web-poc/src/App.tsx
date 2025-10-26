import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import LoginPage from './features/auth/pages/LoginPage';
import SignupPage from './features/auth/pages/SignupPage';
import ProtectedRoute from './shared/components/ProtectedRoute';
import Layout from './shared/components/Layout';
import TransactionsPage from './features/transactions/pages/TransactionsPage';
import CategoriesPage from './features/categories/pages/CategoriesPage';
import ProfilePage from './features/profile/pages/ProfilePage';

const App = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/" replace /> : <SignupPage />}
      />
      <Route
        path="/"
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
