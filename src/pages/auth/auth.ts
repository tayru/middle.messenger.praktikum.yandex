import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';
import { validate } from "../../services/Validation";
import { renderDOM } from "../../core";
import MessengerPage from '../messenger';

import './auth.pcss';

export class AuthPage extends Block {
    protected getStateFromProps() {
        this.state = {

            checkValidation: () => {
                const obj:object = {}

                const inputs = document.querySelectorAll("input");
                const ErrorWrapper = document.querySelector(".error-wrapper");
                let flag:boolean = false;

                for (let i = 0; i < inputs.length; i++) {
                    const input = inputs[i] as HTMLInputElement;
                    const value:string = input.value.trim();
                    const name:string = input.getAttribute("name");

                    obj[name] = value;

                    let result:string | null = validate( name, value)
                    if (result != null) {
                        flag = true;
                        input.parentNode.querySelector(".text-field__error").textContent = result
                        input.parentNode.classList.add("error")
                    } else {
                        input.parentNode.classList.remove("error")
                        ErrorWrapper.textContent = ''
                    }

                }

                console.log('Вывод данных', obj);


            },

            onFocus: () => {
                this.state.checkValidation()
            },
            onBlur: () => {
                this.state.checkValidation()
            },

            regPage: (e: Event) => {
                console.log('regPage')
                e.preventDefault();
                renderDOM(new MessengerPage());
            },

            onLogin: (e: Event) => {
                e.preventDefault();
                this.state.checkValidation()
            }
        }
    }
   render() {
    return template;
  }
}
