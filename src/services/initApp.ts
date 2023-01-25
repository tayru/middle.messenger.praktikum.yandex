import { authAPI } from '../api/auth';
import { UserDTO } from '../api/types';
import type { Dispatch } from '../core';
import { transformUser } from '../utils';
import {chatAPI} from "../api/chat";

export async function initApp(dispatch: Dispatch<AppState>) {

  try {
    const { response, status } = await authAPI.me();
    console.log(response)
    console.log('response')

    if (status !== 200) {
      return;
    }
    const { response: responseChats} = await chatAPI.getChats()
    dispatch({ chats: JSON.parse(responseChats) });
    dispatch({ user: transformUser(JSON.parse(response) as UserDTO) });
  } catch (err) {
    console.log(err);
  } finally {
    dispatch({ appIsInited: true });
  }

  dispatch({ appIsInited: true });
}
