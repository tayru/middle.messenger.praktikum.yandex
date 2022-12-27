import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './register.pcss';




export class RegPage extends Block {
    constructor() {
        super();
    }

   render() {
    return template;
  }
}
