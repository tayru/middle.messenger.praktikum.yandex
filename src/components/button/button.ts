import Block from '../../core/Block';
import template from './template.hbs';

import './button.pcss';

export interface ButtonProps {
  text: string;
  type: string;
  className: string;
  onClick: (event: Event  | undefined) => void;
  events?: { [key: string]: (event?: Event) => void};
  dataTestId?: string;
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


