import { apiRequest } from './HTTPTransport';


type createChat = {
    title: string;
}
type usersToChat = {
    users: number[];
    chatId: number;
}

type idChat = {
    chatId: number
}


export  const chatAPI = {
    getChats: () => {
        return  apiRequest.get('chats', );
    },

    createChat: (data: createChat) => {
        return  apiRequest.post('chats', { data: data });
    },

    getToken: (id: string) => {
        return  apiRequest.post(`chats/token/${id}`, );
    },

    addUserToChats: (data: usersToChat) => {
        return  apiRequest.put('chats/users', { data: data });
    },

    deleteUserToChats: (data: usersToChat) => {
        return  apiRequest.delete('chats/users', { data: data });
    },

    deleteChat: (data: idChat) => {
        return  apiRequest.delete('chats', { data: data });
    },

    // login: (data: LoginRequestData) => {
    //
    //     return  apiRequest.post('auth/signin', { data: data });
    // },
};

