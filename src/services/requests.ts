import { authAPI } from '../api/auth';
import { userAPI } from '../api/user';
import { chatAPI } from '../api/chat';

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

type idChat = {
  chatId: number
}


export const login = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: LoginPayload
) => {
  try {
    dispatch({ isLoading: true });
    console.log('login', action);
    console.log(state);
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
} catch (err) {
  console.log(err);
}
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  try {
    dispatch({ isLoading: true });
    await authAPI.logout();
    dispatch({ isLoading: false, user: null });

    window.router.go('/login');
} catch (err) {
  console.log(err);
}
};

export const registration = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: LoginPayload
) => {
  try {
    dispatch({ isLoading: true });
    console.log('registration', action);
    console.log(state);
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
} catch (err) {
  console.log(err);
}
};

export const editProfile = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: userData
) => {
  try {
  dispatch({ isLoading: true });
  console.log('editProfile', action);
  console.log(state);

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
} catch (err) {
  console.log(err);
}
};


export const editPassword = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: passwordData
) => {
  try {
    dispatch({ isLoading: true });
    console.log('editProfile', action);
    console.log(state);
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
} catch (err) {
  console.log(err);
}
};

export const GetToken = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    IDchat: string,
    // IDUser: string

) => {
  try {
    console.log(state);
    const { response: response} = await chatAPI.getToken(IDchat);
    dispatch({ token: JSON.parse(response).token });
} catch (err) {
  console.log(err);
}
};

export const updateMessage = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    messages: string

) => {
  try {
    console.log(state);
    const data = JSON.parse(messages);
    if (data.type !== ('pong' || 'user_connect')) {
      const prevMsg = window.store.getState().messages;
      if (data instanceof Array) {
        dispatch({ messages: data });
      } else {
        // @ts-ignore
        dispatch({ messages: [data, ...prevMsg] });
      }
    }
} catch (err) {
  console.log(err);
}

};

export const createChat = async (
    dispatch: Dispatch<AppState>,
    _state: AppState,
    title: createChat
) => {
  try {
     await chatAPI.createChat( {
      title: title
    });

    const { response: responseChats} = await chatAPI.getChats()
    dispatch({ chats: JSON.parse(responseChats) });
} catch (err) {
  console.log(err);
}
};

export const deleteChat = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    dataChatId: idChat
) => {
  try {
    await chatAPI.deleteChat(dataChatId);
    dispatch({ messages: [] });
    const { response: responseChats} = await chatAPI.getChats()
    dispatch({ chats: JSON.parse(responseChats) });
    console.log(state);

  } catch (err) {
  console.log(err);
}
};

export const addUser = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    dataUserChat: UserChat
) => {
  try {
    await chatAPI.addUserToChats( dataUserChat);
    console.log(dispatch);
    console.log(state);

  } catch (err) {
    console.log(err);
}
};

export const deleteUser = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    dataUserChat: UserChat
) => {
  try {
    const { response } = await chatAPI.deleteUserToChats( dataUserChat);
    console.log(response)
    console.log(dispatch);
    console.log(state);
} catch (err) {
  console.log(err);
}
};

export const changeAvatar = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: { avatarFormData: FormData; itemId: string | number }
) => {
  try {
    console.log(action.avatarFormData)
    console.log(state);
    const { response } = await userAPI.changeAvatar(action.avatarFormData);
    console.log(response)
    const { response: responseUser} = await authAPI.me();
    dispatch({ user: transformUser(JSON.parse(responseUser) as UserDTO) });
  } catch (err) {
    console.log(err);
  }

}

