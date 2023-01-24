import { apiRequest } from './HTTPTransport';

type userData = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
};

// type LoginResponseData = {} | APIError;

export  const userAPI = {
    changeUser: (data: userData) => {
        return  apiRequest.post('user/profile', { data: data });
    },

    me: () => {
        return apiRequest.get('auth/user');
    },

    logout: () => apiRequest.post('auth/logout'),


};
