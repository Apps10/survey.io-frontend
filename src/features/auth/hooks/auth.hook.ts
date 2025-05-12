import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout, setAuthUser } from '../stores/auth.slice';
import type { IAuthUser } from '../interfaces/user.interface';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const authUser = useAppSelector((state) => state.auth.authUser);
  const isAuthenticated = useAppSelector((state) => state.auth.authUser != null);
  const isAdmin = authUser?.role === 'admin'
  const logoutAction = () => dispatch(logout());
  const setAuthUserAction =  (au: IAuthUser) => dispatch(setAuthUser(au));

  return {
    authUser,
    isAuthenticated,
    isAdmin,
    logoutAction,
    setAuthUserAction
  };
};
