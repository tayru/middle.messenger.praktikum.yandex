import AuthPage from "/src/pages/auth";
import RegPage from "/src/pages/register";
import MessengerPage from "/src/pages/messenger";
import SetPage from "/src/pages/settings";
import ErrorPage from "/src/pages/error";


import { BlockClass } from '/src/core';

export enum Screens {
  RegPage = 'RegPage',
  AuthPage = 'AuthPage',
  MessengerPage = 'MessengerPage',
  SetPage = 'SetPage',
  ErrorPage = 'ErrorPage'
}

const map: Record<Screens, BlockClass<any>> = {
  [Screens.RegPage]: RegPage,
  [Screens.AuthPage]: AuthPage,
  [Screens.MessengerPage]: MessengerPage,
  [Screens.SetPage]: SetPage,
  [Screens.ErrorPage]: ErrorPage,

};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen];
};
