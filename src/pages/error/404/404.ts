import Block from '../../../core/Block';
import template from './template.hbs';

import './404.pcss';
interface ErrorProps {
    title: string;
    text: string;
    img: string;
}

export class Page404 extends Block<any> {
    static componentName = '404';

    constructor(props: ErrorProps) {
        super({...props});
    }

   render() {
    return template;
  }
}


