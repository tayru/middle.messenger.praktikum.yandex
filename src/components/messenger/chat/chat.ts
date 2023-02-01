import Block from '../../../core/Block';
import template from './template.hbs';

import './chat.pcss';


export class Chat extends Block {
  static componentName = `Chat`;

  protected render(): string {
    return template;
  }
}


