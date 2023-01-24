import { authAPI } from '../api/auth';
import { userAPI } from '../api/user';

import { UserDTO } from '../api/types';
import type { Dispatch } from '../core/Store';
import { transformUser } from '../utils';

type LoginPayload = {
  login: string;
  password: string;
};

type userData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export const login = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: LoginPayload
) => {
  dispatch({ isLoading: true });
  console.log('login', action);
  //в ответе не json, не надо делать JSON.parse
  const { response, status } = await authAPI.login(action);

  if (status !== 200) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(response).reason });
    return;
  }
  const { response: responseUser, status: statusUser } = await authAPI.me();

  dispatch({ isLoading: false, loginFormError: null });
  if (statusUser !== 200) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(JSON.parse(responseUser) as UserDTO) });
  window.router.go('/messenger');
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await authAPI.logout();
  dispatch({ isLoading: false, user: null });

  window.router.go('/login');
};

export const registration = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: LoginPayload
) => {
  dispatch({ isLoading: true });
  console.log('registration', action);
  const { response, status } = await authAPI.registration(action);

  if (status !== 200) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(response).reason });
    return;
  }
  const { response: responseUser, status: statusUser } = await authAPI.me();

  dispatch({ isLoading: false, loginFormError: null });
  if (statusUser !== 200) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(JSON.parse(responseUser) as UserDTO) });
  window.router.go('/messenger');
};

export const editProfile = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: userData
) => {
  dispatch({ isLoading: true });
  console.log('editProfile', action);
  const { response, status } = await userAPI.editProfile(action);

  if (status !== 200) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(response).reason });
    return;
  }
  const { response: responseUser} = await authAPI.me();
  dispatch({ isLoading: false, loginFormError: null });

  dispatch({ user: transformUser(JSON.parse(responseUser) as UserDTO) });
  window.router.go('/messenger');
};
