import { apiRequest } from './HTTPTransport';

type userData = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
};

type passwordData = {
    oldPassword: string;
    newPassword: string;
};
// type LoginResponseData = {} | APIError;

export  const userAPI = {
    editProfile: (data: userData) => {
        return  apiRequest.put('user/profile', { data: data });
    },

    editPassword: (data: passwordData) => {
        return  apiRequest.put('user/password', { data: data });
    },

    uploadFile: (data) => {
        return  apiRequest.post('/user/profile/avatar', { data: data });
    },


    // changeAvatar: (data: passwordData) => {
    //     return  apiRequest.put('user/password', { data: data });
    // },


};
