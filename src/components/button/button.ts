import Block from '../../core/Block';
import template from 'bundle-text:./button.hbs';

import './button.pcss';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export class Button extends Block {
  constructor({text, onClick}: ButtonProps) {
    super({text, events: {click: onClick}});
  }

  protected render(): string {
    return template;
  }
}
