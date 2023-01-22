import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';
import { withStore, withRouter, withUser } from '../../utils/';

import './messenger.pcss';
import {validate} from "../../services/Validation";
import {SetPage} from "../settings/settings";


export class MessengerPage extends Block {
    static componentName = 'Messenger';

    protected getStateFromProps() {
        this.state = {

            checkValidation: (e: Event) => {

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

            onFocus: (e: Event) => {
                this.state.checkValidation(e)
            },
            onBlur: (e: Event) => {
                this.state.checkValidation(e)
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
export default withRouter(withStore(withUser(MessengerPage)));

