import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './error.pcss';
interface ErrorProps {
    title: string;
    text: string;
    img: string;
}

console.log(template, 'template')

export class ErrorPage extends Block {
    constructor(props: ErrorProps) {
        super({...props});
    }

   render() {
    return template;
  }
}
