import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './button.pcss';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export class Button extends Block {
  static componentName = `Button`;
  constructor({text, onClick}: ButtonProps) {
    super({text, events: {click: onClick}});
  }

  protected render(): string {
    return template;
  }
}
