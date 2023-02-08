import Block from '../../core/Block';
import template from './template.hbs';
import './register.pcss';
import {validate} from "../../services/Validation";
import {registration} from "../../services/requests";


export class RegPage extends Block<any> {
    static componentName = 'Registration';

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
                const obj:object = {}

                const inputs = document.querySelectorAll("input");
                let flag = false;

                for (let i = 0; i < inputs.length; i++) {
                    const input = inputs[i] as HTMLInputElement;
                    const textField = input.closest(".text-field")

                    const value:string = input.value.trim();
                    const name:string | null = input.getAttribute("name");
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    obj[name] = value;
                    let result: string | null;
                    if (name === "password2") {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        result = validate( name, obj['password'], value);
                    } else  {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        result = validate( name, value)

                    }

                    if (result != null) {
                        flag = true;
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        textField.querySelector(".text-field__error").textContent = result;
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        textField.classList.add("error")
                    } else {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        textField.classList.remove("error")
                    }

                }

                console.log('Вывод данных', obj);

                if (flag === false) return obj; else return null;


            },

            onFocus: () => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.state.checkValidation(event)
            },
            onBlur: () => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.state.checkValidation(event)
            },

            loginPage: (e: Event) => {
                e.preventDefault();
                window.router.go('/login')

            },

            onReg: (e: Event) => {
                e.preventDefault();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const obj = this.state.checkValidation()
                if (obj !== null) {
                    console.log('123214')
                    window.store.dispatch(registration, obj);

                }
            }
        }
    }
    componentDidMount(): void {
        if(window.store.state.user) window.router.go('/messenger')
    }

    componentDidUpdate(): boolean {
        if(window.store.state.user) window.router.go('/messenger')
        return true;
    }
   render() {
    return template;
  }
}


