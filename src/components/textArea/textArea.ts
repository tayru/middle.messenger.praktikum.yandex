import Block from '../../core/Block';
import template from './template.hbs';

import './textArea.pcss';

interface Props {
  name?: string;
  class?: string;
  placeholder?: string;
  events?: { [key: string]: (event?: Event) => void}
  onFocus: (event: Event  | undefined) => void;
  onBlur: (event: Event  | undefined) => void;

}

export class textArea extends Block<Props> {
  static componentName = `textArea`;

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



