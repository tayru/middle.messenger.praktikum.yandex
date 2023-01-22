import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';
import './register.pcss';
import {validate} from "../../services/Validation";


export class RegPage extends Block {
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

            checkValidation: (event: Event) => {
                console.log(event.target)
                const obj:object = {}

                const inputs = document.querySelectorAll("input");
                let flag:boolean = false;

                for (let i = 0; i < inputs.length; i++) {
                    const input = inputs[i] as HTMLInputElement;
                    const textField = input.closest(".text-field")

                    const value:string = input.value.trim();
                    const name:string = input.getAttribute("name");

                    obj[name] = value;
                    let result: string | null;
                    if (name === "password2") {
                       result = validate( name, obj['password'], value);
                    } else  {
                        result = validate( name, value)

                    }

                    if (result != null) {
                        flag = true;
                        textField.querySelector(".text-field__error").textContent = result
                        textField.classList.add("error")
                    } else {
                        textField.classList.remove("error")
                    }

                }

                console.log('Вывод данных', obj);


            },

            onFocus: () => {
                this.state.checkValidation(event)
            },
            onBlur: () => {
                this.state.checkValidation(event)
            },

            loginPage: (e: Event) => {
                e.preventDefault();
                window.router.go('/login')

            },

            onLogin: (e: Event) => {
                e.preventDefault();
                this.state.checkValidation(event)
            }
        }
    }
   render() {
    return template;
  }
}

