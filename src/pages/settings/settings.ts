import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './settings.pcss';
import {validate} from "../../services/Validation";
import {renderDOM} from "../../core";
import MessengerPage from "../messenger";



export class SetPage extends Block {
    protected getStateFromProps() {
        this.state = {

            checkValidation: (form:string) => {
                let inputs;
                if (form === "data") {
                    inputs = document.querySelectorAll(".settings__form-data input");
                } else {
                    inputs = document.querySelectorAll(".settings__form-pass input");
                }

                const obj:object = {}

                const ErrorWrapper = document.querySelector(".error-wrapper");
                let flag:boolean = false;

                for (let i = 0; i < inputs.length; i++) {
                    const input = inputs[i] as HTMLInputElement;
                    const value:string = input.value.trim();
                    const name:string = input.getAttribute("name");

                    obj[name] = value;
                    let result: string | null;
                    if (name === "password2") {
                        console.log(obj['password'])
                        console.log(value, 'password2')
                        result = validate( name, obj['password'], value);
                    } else  {
                        result = validate( name, value)

                    }
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

            onFocus1: () => {
                this.state.checkValidation("data")
            },
            onBlur1: () => {
                this.state.checkValidation("data")
            },

            onFocus2: () => {
                this.state.checkValidation("pass")
            },
            onBlur2: () => {
                this.state.checkValidation("pass")
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
