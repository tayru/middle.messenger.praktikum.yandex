import Block from '../../core/Block';
import template from './template.hbs';
import './settings.pcss';
import {validate} from "../../services/Validation";

import {logout, editProfile,  editPassword,  changeAvatar} from '../../services/requests';
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
                let inputs;
                console.log(event)
                if (form === "data") {
                    inputs = document.querySelectorAll(".settings__form-data input");
                } else {
                    inputs = document.querySelectorAll(".settings__form-pass input");
                }

                const obj:object = {}

                let flag = false;

                for (let i = 0; i < inputs.length; i++) {
                    const input = inputs[i] as HTMLInputElement;
                    const textField = input.closest(".text-field")

                    const value:string = input.value.trim();
                    const name:string | null = input.getAttribute("name");

                    // @ts-ignore
                    obj[name] = value;
                    let result: string | null;
                    if (name === "newPassword") {
                        // @ts-ignore
                        result = validate( name, obj['password'], value);
                        console.log(result)
                    } else  {
                        // @ts-ignore
                        result = validate( name, value)

                    }
                    if (result != null) {
                        flag = true;
                        // @ts-ignore
                        textField.querySelector(".text-field__error").textContent = result;
                        // @ts-ignore
                        textField.classList.add("error")
                    } else {
                        // @ts-ignore
                        textField.classList.remove("error")
                    }

                }

                console.log('Вывод данных', obj);
                if (flag === false) return obj; else return null;



            },

            onFocus1: () => {
                // @ts-ignore
                this.state.checkValidation(event, "data")
            },
            onBlur1: () => {
                // @ts-ignore
                this.state.checkValidation(event, "data")
            },

            onFocus2: () => {
                // @ts-ignore
                this.state.checkValidation(event, "pass")
            },
            onBlur2: () => {
                // @ts-ignore
                this.state.checkValidation(event, "pass")
            },

            onLogout: (e: Event) => {
                e.preventDefault();
                window.store.dispatch(logout)

            },

            editProfile:(e: Event) => {
                // @ts-ignore
                const obj =  this.state.checkValidation(event, "data")
                console.log(obj)
                e.preventDefault();
                console.log('editProfile')
                if (obj !== null) {
                    window.store.dispatch(editProfile, obj);

                }
            },

            editPassword:(e: Event) => {
                // @ts-ignore
                const obj =  this.state.checkValidation(event, "pass")
                console.log(obj)
                e.preventDefault();
                console.log('editPassword')
                if (obj !== null) {
                    window.store.dispatch(editPassword, obj);

                }
            },

            editAvatar:(e: Event) => {
                //сначала загрузить фото, потом обновить данные
                e.preventDefault();
                console.log('editAvatar')
                const idUser = window.store.state.user?.id
                const inputFile = document.getElementById("avatar");
                const avatarFormData = new FormData();
                // @ts-ignore
                avatarFormData.append('avatar', inputFile.files[0]);

                window.store.dispatch(changeAvatar, {
                    avatarFormData: avatarFormData,
                    itemId: idUser,
                });

            },

            onLogin: (e: Event) => {
                e.preventDefault();
                // @ts-ignore
                this.state.checkValidation(event)

            },
            onMessenger: (e: Event) => {
                e.preventDefault();
                console.log('onMessenger')
                window.router.go('/messenger')
            }

        }
    }

   render() {
    return template;
  }
}

export default withRouter(withStore(withUser(SetPage)));

