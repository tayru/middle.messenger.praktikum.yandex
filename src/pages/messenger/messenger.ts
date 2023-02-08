import Block from '../../core/Block';
import template from './template.hbs';
import { withStore, withRouter } from '../../utils/';

import './messenger.pcss';
import {validate} from "../../services/Validation";
import {CoreRouter, Store} from "../../core";
import {updateMessage, createChat,  addUser, deleteChat} from '../../services/requests';
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

            checkValidation: () => {

                const textArea = document.querySelector("#message-area");
                const errorWrapper = document.querySelector('.chat__input-error');
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const message:string | null | undefined = textArea.value;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const name:string | null | undefined = textArea.getAttribute("name");
                if (name == null || message == null) return
                if (errorWrapper == null) return

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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.state.checkValidation(e)
            },
            onBlur: (e: Event) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.state.checkValidation(e)
            },

            onSend: (e: Event) => {
                e.preventDefault();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.state.checkValidation()
            },

            onSettings: (e: Event) => {
                e.preventDefault();
                console.log('onSettings')
                window.router.go('/settings')
            },
            selectChat: async (e: Event) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const IDchat = e.currentTarget.dataset.id * 1;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                window.store.dispatch({ ActiveChat: IDchat });
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const IDuser = window.store.state.user.id;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                let { response: token} = await chatAPI.getToken(IDchat)
                token = JSON.parse(token).token

                const path = `wss://ya-praktikum.tech/ws/chats/${IDuser}/${IDchat}/${token}`;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.ws = new WebSocket(path);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.ws.addEventListener('open', () => {
                    console.log('Соединение установлено');
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    this.ws.send(JSON.stringify({
                        content: '0',
                        type: 'get old',
                    }));
                });
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.ws.addEventListener('message', event => {
                    console.log('Получены данные', JSON.parse(event.data));

                    window.store.dispatch(updateMessage, event.data);
                });

            },

            sendMessage:(e: Event) => {
                e.preventDefault();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                let text = document.querySelector('.message-area').value;
                text = text.trim();
                if (text === '') return false;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.ws.send(JSON.stringify({
                    content: text,
                    type: 'message',
                }));
            },
            createChat:(e:Event) => {
                e.preventDefault();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const text = document.querySelector('#create-chat__input').value;
                window.store.dispatch(createChat, text);
            },
            addUser:(e: Event) => {
                e.preventDefault();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const id = document.querySelector('#addUser__input').value;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const idChat = window.store.state.ActiveChat;

                const UserChat = {
                    users: [id],
                    chatId: idChat
                }
                window.store.dispatch(addUser, UserChat);
            },
            deleteUser:(e: Event) => {
                e.preventDefault();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const id = document.querySelector('#deleteUser__input').value;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const idChat = window.store.state.ActiveChat;

                const UserChat = {
                    users: [id],
                    chatId: idChat
                }
                window.store.dispatch(addUser, UserChat);

            },
            deleteChat:(e: Event) => {
                e.preventDefault();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
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


