import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './button.pcss';

interface ButtonProps {
  text: string;
  onClick: (event: Event  | undefined) => void;
  events?: { [key: string]: (event?: Event) => void}
}
export class Button extends Block<ButtonProps> {
// export class Button extends Block {
  static componentName = `Button`;
  
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick
      }
    });
  }

  protected render(): string {
    return template;
  }
}
