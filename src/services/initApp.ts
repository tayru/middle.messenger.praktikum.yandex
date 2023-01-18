import { authAPI } from '/src/api/auth';
import { UserDTO } from '/src/api/types';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from '/src/utils';

export async function initApp(dispatch: Dispatch<AppState>) {

  // Ручкая задержка для демонстрации загрузочного экрана
  await new Promise(r => setTimeout(r, 700));

  try {
    const response = await authAPI.me();

    if (apiHasError(response)) {
      return;
    }

    dispatch({ user: transformUser(response as UserDTO) });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
