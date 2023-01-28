import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './input.pcss';

interface Props {
  name?: string;
  type?: "string" | "number" | "email" | "tel" | "password";
  class?: string;
  events?: { [key: string]: (event?: Event) => void}
  onFocus: (event: Event  | undefined) => void;
  onBlur: (event: Event  | undefined) => void;
}

export class Input extends Block<Props> {

static componentName = `Input`;

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



