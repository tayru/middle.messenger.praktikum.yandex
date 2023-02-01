import Block from '../../../core/Block';
import template from './template.hbs';

import './500.pcss';
interface ErrorProps {
    title: string;
    text: string;
    img: string;
}

export class Page500 extends Block {
    static componentName = '500';

    constructor(props: ErrorProps) {
        super({...props});
    }

   render() {
    return template;
  }
}


