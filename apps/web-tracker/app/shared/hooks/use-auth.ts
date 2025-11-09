import { useSelector } from 'react-redux';

import type { RootState } from '@/app/store';
import {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useRefreshMutation,
} from '@/app/store/api/auth-api';

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isAuthenticated = !!accessToken && !!user;

  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [signupMutation, { isLoading: isSignupLoading }] = useSignupMutation();
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const [refreshMutation, { isLoading: isRefreshLoading }] =
    useRefreshMutation();

  return {
    user,
    accessToken,
    isAuthenticated,
    login: loginMutation,
    signup: signupMutation,
    logout: logoutMutation,
    refresh: refreshMutation,
    isLoading:
      isLoginLoading || isSignupLoading || isLogoutLoading || isRefreshLoading,
  };
};
