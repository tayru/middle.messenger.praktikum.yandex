import { apiRequest } from './HTTPTransport';


type createChat = {
    title: string;
}
type usersToChat = {
    users: number[];
    chatId: number;
}

export  const chatAPI = {
    getChats: () => {
        return  apiRequest.get('chats', );
    },

    createChat: (data: createChat) => {
        return  apiRequest.post('chats', { data: data });
    },

    addUserToChats: (data: usersToChat) => {
        return  apiRequest.put('chats/users', { data: data });
    },

    deleteUserToChats: (data: usersToChat) => {
        return  apiRequest.delete('chats/users', { data: data });
    },

    // login: (data: LoginRequestData) => {
    //
    //     return  apiRequest.post('auth/signin', { data: data });
    // },
};
