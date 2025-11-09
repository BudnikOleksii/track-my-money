import {
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useSignupMutation,
} from '@/src/store/api/auth-api';
import { useAppSelector } from '@/src/store/hooks';

export const useAuth = () => {
  const user = useAppSelector((state) => state.auth.user);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
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
