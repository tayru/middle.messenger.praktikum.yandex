import AuthPage from "../../src/pages/auth";
import RegPage from "../../src/pages/register";
import MessengerPage from "../../src/pages/messenger";
import SetPage from "../../src/pages/settings";
import Page404 from "../../src/pages/error/404";
import Page500 from "../../src/pages/error/500";


import { BlockClass } from '../../src/core';

export enum Screens {
  RegPage = 'RegPage',
  AuthPage = 'AuthPage',
  MessengerPage = 'MessengerPage',
  SetPage = 'SetPage',
  Page500 = 'Page500',
  Page404 = 'Page404',
}

const map: Record<Screens, BlockClass<any>> = {
  [Screens.RegPage]: RegPage,
  [Screens.AuthPage]: AuthPage,
  [Screens.MessengerPage]: MessengerPage,
  [Screens.SetPage]: SetPage,
  [Screens.Page500]: Page500,
  [Screens.Page404]: Page404,

};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen];
};

