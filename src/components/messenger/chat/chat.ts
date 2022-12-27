import Block from '../../../core/Block';
import template from 'bundle-text:./template.hbs';

import './chat.pcss';


export class Chat extends Block {

  protected render(): string {
    return template;
  }
}
