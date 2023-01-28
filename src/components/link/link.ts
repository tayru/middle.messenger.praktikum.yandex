import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './link.pcss';

interface LinkProps {
  text: string;
  url: string;
  class: string;
  events?: { [key: string]: (event?: Event) => void}
  onClick: (event: Event  | undefined) => void;
}

export class Link extends Block<LinkProps> {

static componentName = `Link`;

  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        // @ts-ignore
        onClick: (e: Event) => {
          e.preventDefault();

          // @ts-ignore
          router.go(this.props.url);
        }
      }
    });
  }

  protected render(): string {
    return template;
  }
}

