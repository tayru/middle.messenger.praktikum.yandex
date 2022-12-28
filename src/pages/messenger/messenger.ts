import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './messenger.pcss';
import {validate} from "../../services/Validation";
import {renderDOM} from "../../core";




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
                // let flag:boolean = false;
                //
                // console.log(message.value)

                // for (let i = 0; i < inputs.length; i++) {
                //     const input = inputs[i] as HTMLInputElement;
                //     const value:string = input.value.trim();
                //     const name:string = input.getAttribute("name");
                //
                //     obj[name] = value;
                //
                //     let result:string | null = validate( name, value)
                //     if (result != null) {
                //         flag = true;
                //         input.parentNode.querySelector(".text-field__error").textContent = result
                //         input.parentNode.classList.add("error")
                //     } else {
                //         input.parentNode.classList.remove("error")
                //         ErrorWrapper.textContent = ''
                //     }
                //
                // }
                //
                // console.log('Вывод данных', obj);


            },

            onFocus: () => {
                console.log('12312')
                this.state.checkValidation()
            },
            onBlur: () => {
                console.log('12312')

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
