import Block from '../../core/Block';
import template from './template.hbs';
import './splash.pcss';


export class Splash extends Block<any> {
    constructor() {
        super();
    }

   render() {
    return template;
  }
}


