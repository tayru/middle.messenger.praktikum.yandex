import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './messenger.pcss';

interface ErrorProps {
    title: string;
    text: string;
    img: string;
}


export class MessengerPage extends Block {
    constructor(props: ErrorProps) {
        super({...props});
    }

   render() {
    return template;
  }
}
