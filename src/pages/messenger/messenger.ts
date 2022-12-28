import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './messenger.pcss';
import {validate} from "../../services/Validation";


export class MessengerPage extends Block {
    protected getStateFromProps() {
        this.state = {

            checkValidation: () => {

                const textArea = document.querySelector("#message-area");
                const errorWrapper = document.querySelector('.chat__input-error');

                const message:string | null | undefined = textArea.value;
                const name:string | null | undefined = textArea.getAttribute("name");

                const text:string | null = validate(name, message);

                if (text !== null) {
                    errorWrapper.classList.add('active')
                    errorWrapper.textContent = text
                } else {
                    errorWrapper.classList.remove('active')
                    errorWrapper.textContent = ''
                }
                console.log('Сообщение:', message)
            },

            onFocus: () => {
                this.state.checkValidation()
            },
            onBlur: () => {
                this.state.checkValidation()
            },

            onSend: (e: Event) => {
                e.preventDefault();
                this.state.checkValidation()
            }
        }
    }

   render() {
    return template;
  }
}

