import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';
import { withStore, withRouter } from '../../utils/';
import type { Dispatch } from '../../core';

import './messenger.pcss';
import {validate} from "../../services/Validation";
import {CoreRouter, Store} from "../../core";
import {updateMessage, createChat, login, addUser, deleteChat} from '../../services/requests';
import {chatAPI} from "../../api/chat";

type MessagePageProps = {
    router: CoreRouter;
    store: Store<AppState>;
    user: User | null;
    onLogout?: () => void;
    ws?: any;
};

type UserChat = {
    users: number[],
    chatId: number
}

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
                let IDchat = e.currentTarget.dataset.id * 1;
                window.store.dispatch({ ActiveChat: IDchat });
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
                    console.log('Получены данные', JSON.parse(event.data));

                    window.store.dispatch(updateMessage, event.data);
                });

            },

            sendMessage:(e: Event) => {
                e.preventDefault();
                let text = document.querySelector('.message-area').value;
                text = text.trim();
                if (text === '') return false
                this.ws.send(JSON.stringify({
                    content: text,
                    type: 'message',
                }));
            },
            createChat:(e:Event) => {
                e.preventDefault();
                const text = document.querySelector('#create-chat__input').value;
                window.store.dispatch(createChat, text);
            },
            addUser:(e: Event) => {
                e.preventDefault();
                const id = document.querySelector('#addUser__input').value;
                const idChat = window.store.state.ActiveChat;

                const UserChat = {
                    users: [id],
                    chatId: idChat
                }
                window.store.dispatch(addUser, UserChat);
            },
            deleteUser:(e: Event) => {
                e.preventDefault();
                const id = document.querySelector('#deleteUser__input').value;
                const idChat = window.store.state.ActiveChat;

                const UserChat = {
                    users: [id],
                    chatId: idChat
                }
                window.store.dispatch(addUser, UserChat);

            },
            deleteChat:(e: Event) => {
                e.preventDefault();
                const id = window.store.state.ActiveChat;
                console.log(id)
                const idChat = {
                    chatId: id
                }
                window.store.dispatch(deleteChat, idChat);
            }
        }
    }

   render() {
    return template;
  }
}
export default withRouter(withStore(MessengerPage));


