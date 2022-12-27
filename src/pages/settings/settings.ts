import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './settings.pcss';



export class SetPage extends Block {
    constructor() {
        super();
    }

   render() {
    return template;
  }
}
