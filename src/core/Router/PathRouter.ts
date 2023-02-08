import { CoreRouter } from "./CoreRouter";

export class PathRouter implements CoreRouter {
  private routes: Record<string, () => void> = {};

  private isStarted = false;

  start() {
    if (!this.isStarted) {
      this.isStarted = true;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.onpopstate = (event: PopStateEvent) => {
        this.onRouteChange.call(this);
      };

      this.onRouteChange();
    }
  }

  private onRouteChange(pathname: string = window.location.pathname) {
    const found = Object.entries(this.routes).some(([routeHash, callback]) => {
      if (routeHash === pathname) {
        callback();
        return true;
      }
      return false;
    });

    if (!found && this.routes['*']) {
      this.routes['*']();
    }
  }

  use(hash: string, callback: any) {
    this.routes[hash] = callback;
    return this;
  }

  go(pathname: string) {
    window.history.pushState({}, '', pathname);
    this.onRouteChange(pathname);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }
}

