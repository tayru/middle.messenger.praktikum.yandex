import { withIsLoading } from '../../utils/withIsLoading';
import { withStore } from '../../utils/withStore';
import { withRouter } from '../../utils/withRouter';
import { CoreRouter, Store} from '../../core';
import { login } from '../../services/requests';

import Block from '../../core/Block';
import template from './template.hbs';
import { validate } from "../../services/Validation";

import './auth.pcss';

type loginPageProps = {
    router: CoreRouter;
    store: Store<AppState>;
    isLoading: boolean;
    onToggleAppLoading?: () => void;
    onNavigateNext?: () => void;
    onSignUp?: (e: MouseEvent) => void;
    onSubmit?: (e: FormDataEvent) => void;
    onInput?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
};

export class AuthPage extends Block<loginPageProps> {
    static componentName = 'Authorization';

    protected getStateFromProps() {
        this.state = {

            regPage: (e: Event) => {
                e.preventDefault();
                window.router.go('/RegPage')
            },

            checkValidation: (event: Event) => {
                console.log(event)
                const obj:object = {}

                const inputs = document.querySelectorAll("input");
                let flag = false;

                for (let i = 0; i < inputs.length; i++) {
                    const input = inputs[i] as HTMLInputElement;
                    const textField = input.closest(".text-field")

                    const value:string = input.value.trim();
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const name:string = input.getAttribute("name");
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    obj[name] = value;

                    const result:string | null = validate( name, value)
                    if (result != null) {
                        flag = true;
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        textField.querySelector(".text-field__error").textContent = result
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        textField.classList.add("error")
                    } else {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        textField.classList.remove("error")
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        textField.querySelector(".text-field__error").textContent = ''
                    }

                }
                console.log('Вывод данных', obj);

                if (flag === false) return obj; else return null;


            },

            onFocus: (event: Event) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.state.checkValidation(event)
            },
            onBlur: (event: Event) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.state.checkValidation(event)
            },


            onLogin: (e: Event) => {
                e.preventDefault();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const obj = this.state.checkValidation()
                if (obj !== null) {
                    console.log('123214')
                    window.store.dispatch(login, obj);

                }
            }
        }
    }

    componentDidMount(): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if(window.store.state.user) window.router.go('/messenger')
    }

    componentDidUpdate(): boolean {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if(window.store.state.user) window.router.go('/messenger')
        return true;
    }



   render() {
    return template;
  }
}

export default withRouter(withStore(withIsLoading(AuthPage)));

