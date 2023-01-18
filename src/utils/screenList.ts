import mainAuth from "/src/pages/auth";
import OnboardingPage from "/src/pages/onboarding";

import { BlockClass } from '/src/core';

export enum Screens {
  Onboarding = 'onboadring',
  Login = 'mainAuth',
}

const map: Record<Screens, BlockClass<any>> = {
  [Screens.Onboarding]: OnboardingPage,
  [Screens.Login]: mainAuth,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen];
};
