import { Store, renderDOM, CoreRouter } from './core';
import { getScreenComponent, Screens } from './utils';

const routes = [
  {
    path: '/RegPage',
    block: Screens.RegPage,
    shouldAuthorized: false,
  },
  {
    path: '/login',
    block: Screens.AuthPage,
    shouldAuthorized: false,
  },
  {
    path: '*',
    block: Screens.RegPage,
    shouldAuthorized: false,
  },
];

export function initRouter(router: CoreRouter, store: Store<AppState>) {
  routes.forEach(route => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);
      const currentScreen = Boolean(store.getState().screen);
      
      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({ screen: route.block });
        return;
      }

      if (!currentScreen) {
        store.dispatch({ screen: Screens.AuthPage });
      }
    });
  });

  /**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */
  store.on('changed', (prevState, nextState) => {
    console.log(nextState, 'nextState')
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }
    
    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page({}));
      document.title = `App / ${Page.componentName}`;
    }
  });
}
