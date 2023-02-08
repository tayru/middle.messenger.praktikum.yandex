import { getByTestId } from '@testing-library/dom'
import Splash  from './index';
import { BlockClass, renderDOM, registerComponent, Store, PathRouter  } from '../../core';
import * as components from '../../components';
import { defaultState } from '../../store';

type RenderBlockParams<T> = {
    Block: BlockClass<T>;
    props: T;
    state?: Partial<AppState>;
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function renderBlock<T extends AnyObject>({ Block, props, state = defaultState }: RenderBlockParams<T>) {
      Object.values(components).forEach((Component: any) => {
            registerComponent(Component);
          });
    const store = new Store<AppState>({ ...defaultState, ...state });
    const router = new PathRouter();
    window.router = router;
    window.store = store;

    document.body.innerHTML = '<div id="app"></div>';
    renderDOM(new Block(props as T));
}

describe('pages/Splash', () => {
    it('should render logo', () => {
        renderBlock({
            Block: Splash,
            props: {},
        });

        expect(getByTestId(document.body, 'splash-logo')).toBeInTheDocument();
    });
});
