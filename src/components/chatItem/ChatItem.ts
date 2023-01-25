import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './ChatItem.pcss';

interface ChatItemProps {
  text: string;
  className: string;
  onClick: (event: Event  | undefined) => void;
  events?: { [key: string]: (event?: Event) => void}
}
export class ChatItem extends Block<ChatItemProps> {
// export class Button extends Block {
  static componentName = `ChatItem`;

  constructor(props: ChatItemProps) {
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

