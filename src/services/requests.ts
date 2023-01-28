import { authAPI } from '../api/auth';
import { userAPI } from '../api/user';
import { chatAPI } from '../api/chat';

import { UserDTO, TChat } from '../api/types';
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
type passwordData = {
  oldPassword: string;
  newPassword: string;
};

type createChat = {
  title: string;
}

type UserChat = {
  users: number[],
  chatId: number
}

type APIError = {
  reason: string;
};

type AvatarItem = { id: number; src: string };

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
  const { response: responseChats} = await chatAPI.getChats()
  dispatch({ chats: JSON.parse(responseChats) });
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
  const { response: responseChats} = await chatAPI.getChats()
  dispatch({ chats: JSON.parse(responseChats) });
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
  const { response: responseChats} = await chatAPI.getChats()
  dispatch({ chats: JSON.parse(responseChats) });
  dispatch({ user: transformUser(JSON.parse(responseUser) as UserDTO) });
};


export const editPassword = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: passwordData
) => {
  dispatch({ isLoading: true });
  console.log('editProfile', action);
  const { response, status } = await userAPI.editPassword(action);

  if (status !== 200) {
    dispatch({ isLoading: false, loginFormError: JSON.parse(response).reason });
    return;
  }
  const { response: responseUser} = await authAPI.me();
  dispatch({ isLoading: false, loginFormError: null });
  const { response: responseChats} = await chatAPI.getChats()
  dispatch({ chats: JSON.parse(responseChats) });
  dispatch({ user: transformUser(JSON.parse(responseUser) as UserDTO) });
};

export const GetToken = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    IDchat: string,
    IDUser: string

) => {
  const { response: response} = await chatAPI.getToken(IDchat);
  dispatch({ token: JSON.parse(response).token });

};

export const updateMessage = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    messages: string

) => {
  dispatch({ messages: JSON.parse(messages) });

};

export const createChat = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    title: createChat
) => {
  console.log(title)

  const { response, status } = await chatAPI.createChat( {
    title: title
  });
};

export const addUser = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    dataUserChat: UserChat
) => {
  console.log(dataUserChat)

  const { response } = await chatAPI.addUserToChats( dataUserChat);
  console.log(response)
};

export const deleteUser = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    dataUserChat: UserChat
) => {
  console.log(dataUserChat)

  const { response } = await chatAPI.deleteUserToChats( dataUserChat);
  console.log(response)
};

export const changeAvatar = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: { avatarFormData: FormData; itemId: string | number }
) => {
  console.log(action.avatarFormData)
  const { response } = await userAPI.changeAvatar(action.avatarFormData);
  console.log(response)

}
