import AuthPage from "/src/pages/auth";
import RegPage from "/src/pages/register";


import { BlockClass } from '/src/core';

export enum Screens {
  RegPage = 'RegPage',
  AuthPage = 'AuthPage',
}

const map: Record<Screens, BlockClass<any>> = {
  [Screens.RegPage]: RegPage,
  [Screens.AuthPage]: AuthPage,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen];
};
