import Block from '../../../core/Block';
import template from './template.hbs';

import './ChatItem.pcss';


export class ChatItem extends Block<any> {
  static componentName = `ChatItem`;

  protected render(): string {
    return template;
  }
}


