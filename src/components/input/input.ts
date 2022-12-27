import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './input.pcss';

interface Props {
  name?: string;
  type?: "string" | "number" | "email" | "tel" | "password";
  class?: string;
  autocomplete: string;
  pattern?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export class Input extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        focus: props.onFocus,
        blur: props.onBlur
      }
    });
  }

  protected render(): string {
    return template;
  }
}

