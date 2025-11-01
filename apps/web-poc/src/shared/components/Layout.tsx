import { Outlet, Link, useLocation } from 'react-router-dom';
import { Wallet, Tags, User, LogOut } from 'lucide-react';

import { Button } from '../ui/button';
import { useLogoutMutation } from '../../store/api/authApi';
import { Toaster } from './Toaster';
import { ROUTES } from '../constants/routes';

const NAV_ITEMS = [
  { path: ROUTES.APP.TRANSACTIONS, label: 'Transactions', icon: Wallet },
  { path: ROUTES.APP.CATEGORIES, label: 'Categories', icon: Tags },
  { path: ROUTES.APP.PROFILE, label: 'Profile', icon: User },
];

const Layout = () => {
  const location = useLocation();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout(undefined);
    window.location.href = ROUTES.AUTH.LOGIN;
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="flex h-screen">
        <aside className="w-64 border-r bg-card">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center border-b px-6">
              <h1 className="text-xl font-semibold">Track My Money</h1>
            </div>
            <nav className="flex-1 space-y-1 p-4">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      className="w-full justify-start"
                      size="lg"
                    >
                      <Icon className="mr-2 h-5 w-5" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
            <div className="border-t p-4">
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full justify-start"
                size="lg"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
