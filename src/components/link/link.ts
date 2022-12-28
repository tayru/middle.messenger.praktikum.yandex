import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './link.pcss';

interface LinkProps {
  text: string;
  class: string;
  onClick: () => void;
}

export class Link extends Block {
  static componentName = `Link`;

  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        onClick: props.onClick
      }
    });
  }

  protected render(): string {
    return template;
  }
}