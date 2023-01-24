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
    editProfile: (data: userData) => {
        return  apiRequest.put('user/profile', { data: data });
    },




};
