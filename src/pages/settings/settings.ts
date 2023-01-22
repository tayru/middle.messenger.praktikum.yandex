import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';
import './settings.pcss';
import {validate} from "../../services/Validation";
import {renderDOM} from "../../core";
import MessengerPage from "../messenger";
import { logout } from '../../services/auth';
import { CoreRouter} from '../../core/';
import { Store} from '../../core/';
import { withStore, withRouter, withUser } from '../../utils/';

type SettingsPageProps = {
    router: CoreRouter;
    store: Store<AppState>;
    user: User | null;
    onLogout?: () => void;
};

export class SetPage extends Block<SettingsPageProps> {
    static componentName = 'Settings';
    constructor(props: SettingsPageProps) {
        super(props);
        console.log(props, 'props')

    }

    protected getStateFromProps() {

        this.state = {

            checkValidation: (event: Event, form:string, ) => {
                console.log(event.target)
                let inputs;
                if (form === "data") {
                    inputs = document.querySelectorAll(".settings__form-data input");
                } else {
                    inputs = document.querySelectorAll(".settings__form-pass input");
                }

                const obj:object = {}

                let flag:boolean = false;

                for (let i = 0; i < inputs.length; i++) {
                    const input = inputs[i] as HTMLInputElement;
                    const textField = input.closest(".text-field")

                    const value:string = input.value.trim();
                    const name:string = input.getAttribute("name");

                    obj[name] = value;
                    let result: string | null;
                    if (name === "newPassword2") {
                        result = validate( name, obj['password'], value);
                        console.log(result)
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

            onFocus1: () => {
                this.state.checkValidation(event, "data")
            },
            onBlur1: () => {
                this.state.checkValidation(event, "data")
            },

            onFocus2: () => {
                this.state.checkValidation(event, "pass")
            },
            onBlur2: () => {
                this.state.checkValidation(event, "pass")
            },

            onLogout: (e: Event) => {
                e.preventDefault();
                console.log('exit')
                window.store.dispatch(logout)

            },

            regPage: (e: Event) => {
                e.preventDefault();
                renderDOM(new MessengerPage());
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

export default withRouter(withStore(withUser(SetPage)));
