import { getByTestId } from '@testing-library/dom'
import { Splash } from './index';
import { BlockClass, renderDOM } from '../../core';

type RenderBlockParams<T> = {
    Block: BlockClass<T>;
    props: T;
}

function renderBlock<T extends Object>({ Block, props }: RenderBlockParams<T>) {
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
