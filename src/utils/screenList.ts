import mainAuth from "/src/pages/auth";

import { BlockClass } from '/src/core';

export enum Screens {
  Login = 'mainAuth',
}

const map: Record<Screens, BlockClass<any>> = {
  [Screens.Login]: mainAuth,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen];
};
