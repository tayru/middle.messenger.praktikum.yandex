import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';
import { validate } from "../../services/Validation";
import { renderDOM } from "../../core";
import MessengerPage from '../messenger';

import './auth.pcss';

// interface Props {
//     title: string;
//     text: string;
//     img: string;
//     onClick: () => void;
//
// }


export class AuthPage extends Block {
    protected getStateFromProps() {
        this.state = {
            values: {
                login: '',
                password: '',
            },
            errors: {
                login: '',
                password: '',
            },

            checkValidation: () => {
                const inputs = document.querySelectorAll("input");
                const ErrorWrapper = document.querySelector(".error-wrapper");
                let flag:boolean = false;

                for (let i = 0; i < inputs.length; i++) {
                    const input = inputs[i] as HTMLInputElement;
                    const value:string = input.value.trim();
                    const name:string = input.getAttribute("name");
                    console.log();
                    let result:string | null = validate( name, value)
                    if (result != null) {
                        flag = true;
                        input.classList.add("error")
                        ErrorWrapper.textContent = result
                    } else {
                        input.classList.remove("error")
                        ErrorWrapper.textContent = ''
                    }

                }

            },

            onFocus: () => {
                this.state.checkValidation()
            },



            onBlur: () => {

            },

            regPage: (e: Event) => {
                console.log('regPage')
                e.preventDefault();
                renderDOM(new MessengerPage());
            },

            onLogin: (e: Event) => {
                e.preventDefault();
                // const loginData = {
                //     login: (this.refs.login.firstElementChild as HTMLInputElement).value,
                //     password: (this.refs.password.firstElementChild as HTMLInputElement).value
                // };
                //
                // const nextState = {
                //     errors: {
                //         login: '',
                //         password: '',
                //     },
                //     values: { ...loginData },
                // };
                //
                // if (!loginData.login) {
                //     nextState.errors.login = 'Login is required';
                // } else if (loginData.login.length < 4) {
                //     nextState.errors.login = 'Login should contain more than 3 chars';
                // }
                //
                // if (!loginData.password) {
                //     nextState.errors.password = 'Password is required';
                // }
                //
                // this.setState(nextState);
                console.log('action/login');

                // console.log('action/login', loginData);
            }
        }
    }
   render() {
    return template;
  }
}
