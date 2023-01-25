import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';
import { withStore, withRouter } from '../../utils/';

import './messenger.pcss';
import {validate} from "../../services/Validation";
import {CoreRouter, Store} from "../../core";
import {editPassword, GetToken} from '../../services/requests';

type MessagePageProps = {
    router: CoreRouter;
    store: Store<AppState>;
    user: User | null;
    onLogout?: () => void;
};

export class MessengerPage extends Block<MessagePageProps> {
    static componentName = 'Messenger';
    constructor(props: MessagePageProps) {
        super(props);
        console.log(props, 'props')

    }

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
            },

            onSettings: (e: Event) => {
                e.preventDefault();
                console.log('onSettings')
                window.router.go('/settings')
            },
            selectChat: (e: Event) => {
                let IDchat = e.currentTarget.dataset.id
                let IDuser = store.state.user.id;
                let token = window.store.dispatch(GetToken, IDchat, IDuser);




            }
        }
    }

   render() {
    return template;
  }
}
export default withRouter(withStore(MessengerPage));

