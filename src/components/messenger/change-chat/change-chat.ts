import Block from '../../../core/Block';
import template from './template.hbs';

import './change-chat.pcss';


export class changeChat extends Block<any> {

  static componentName = `changeChat`;

  protected render(): string {
    return template;
  }
}


