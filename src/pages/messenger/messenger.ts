import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './messenger.pcss';




export class MessengerPage extends Block {
    constructor() {
        super();
    }

   render() {
    return template;
  }
}
