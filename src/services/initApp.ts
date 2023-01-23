import { authAPI } from '../api/auth';
import { UserDTO } from '../api/types';
import type { Dispatch } from '../core';
import { transformUser } from '../utils';

export async function initApp(dispatch: Dispatch<AppState>) {

  try {
    const { response, status } = await authAPI.me();
    console.log(response)
    console.log('response')

    if (status !== 200) {
      return;
    }

    dispatch({ user: transformUser(JSON.parse(response) as UserDTO) });
  } catch (err) {
    console.log(err);
  } finally {
    dispatch({ appIsInited: true });
  }

  dispatch({ appIsInited: true });
}
