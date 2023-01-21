import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';
import './splash.pcss';


export class Splash extends Block {
    constructor() {
        super();
    }

   render() {
    return template;
  }
}

