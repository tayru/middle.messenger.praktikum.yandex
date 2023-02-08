import Block from '../../core/Block';
import template from './template.hbs';

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onClick: (e: Event) => {
          e.preventDefault();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

