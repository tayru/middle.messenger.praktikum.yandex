import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';
import { withStore, withRouter } from '../../utils/';
import type { Dispatch } from '../../core';

import './messenger.pcss';
import {validate} from "../../services/Validation";
import {CoreRouter, Store} from "../../core";
import {updateMessage} from '../../services/requests';
import {chatAPI} from "../../api/chat";

type MessagePageProps = {
    router: CoreRouter;
    store: Store<AppState>;
    user: User | null;
    onLogout?: () => void;
    ws?: any;
};

export class MessengerPage extends Block<MessagePageProps> {
    static componentName = 'Messenger';
    constructor(props: MessagePageProps) {
        super(props);
        console.log(props, 'props')

    }

    protected getStateFromProps() {
        this.state = {
            values: {
                ws: {},
            },

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
            selectChat: async (e: Event) => {
                let IDchat = e.currentTarget.dataset.id
                let IDuser = store.state.user.id;
                let { response: token} = await chatAPI.getToken(IDchat)
                token = JSON.parse(token).token

                let path = `wss://ya-praktikum.tech/ws/chats/${IDuser}/${IDchat}/${token}`;
                let socket = new WebSocket(path);
                this.ws = new WebSocket(path);
                this.ws.addEventListener('open', () => {
                    console.log('Соединение установлено');

                    this.ws.send(JSON.stringify({
                        content: '0',
                        type: 'get old',
                    }));
                });

                this.ws.addEventListener('message', event => {
                    window.store.dispatch(updateMessage, event.data);
                });

            },

            sendMessage:(e: Event) => {
                this.ws.send(JSON.stringify({
                    content: 'Моё первое сообщение миру!',
                    type: 'message',
                }));
            }
        }
    }

   render() {
    return template;
  }
}
export default withRouter(withStore(MessengerPage));

