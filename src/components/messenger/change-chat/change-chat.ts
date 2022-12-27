import Block from '../../../core/Block';
import template from 'bundle-text:./template.hbs';

import './change-chat.pcss';


export class changeChat extends Block {

  protected render(): string {
    return template;
  }
}
