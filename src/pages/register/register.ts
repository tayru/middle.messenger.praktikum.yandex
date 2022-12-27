import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './register.pcss';

interface ErrorProps {
    title: string;
    text: string;
    img: string;
}

console.log(template, 'template')

export class RegPage extends Block {
    constructor(props: ErrorProps) {
        super({...props});
    }

   render() {
    return template;
  }
}
