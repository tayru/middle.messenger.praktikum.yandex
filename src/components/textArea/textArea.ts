import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './textArea.pcss';

interface Props {
  name?: string;
  class?: string;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export class textArea extends Block {
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

